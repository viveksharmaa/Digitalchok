const User = require("../models/User");
const Session = require("../models/Session")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../config/auth");
// SIGNUP
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !role ||
      !address?.address ||
      !address?.city ||
      !address?.state ||
      !address?.country
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!["customer", "provider"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      password: hashedPassword,
      role,

      address: {
        address: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
        latitude: address.latitude ?? null,
        longitude: address.longitude ?? null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// LOGIN

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create a separate session for this device/browser
    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "initializing",
      userAgent: req.get("user-agent") || "Unknown",
      ipAddress: req.ip,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(
      user,
      session._id
    );

    session.refreshTokenHash = hashToken(refreshToken);
    await session.save();

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

const createAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
    }
  );
};

const createRefreshToken = (user, sessionId) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      sessionId: sessionId.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
    }
  );
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", accessCookieOptions);
  res.clearCookie("refreshToken", refreshCookieOptions);
};


const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      clearAuthCookies(res);

      return res.status(200).json({
        success: true,
        authenticated:false,
        message: "No active session",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch {
      clearAuthCookies(res);

      return res.status(401).json({
        success: false,
        message: "Refresh token expired or invalid",
      });
    }

    const session = await Session.findOne({
      _id: decoded.sessionId,
      userId: decoded.userId,
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      clearAuthCookies(res);

      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Verify that this refresh token belongs to this session
    if (session.refreshTokenHash !== hashToken(refreshToken)) {
      // Reuse of an old refresh token: revoke this session
      session.revokedAt = new Date();
      await session.save();

      clearAuthCookies(res);

      return res.status(401).json({
        success: false,
        message: "Session invalid. Please login again.",
      });
    }

    const user = await User.findById(session.userId);

    if (!user) {
      session.revokedAt = new Date();
      await session.save();

      clearAuthCookies(res);

      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    // Rotate both tokens
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(
      user,
      session._id
    );

    session.refreshTokenHash = hashToken(newRefreshToken);
    session.expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await session.save();

    setAuthCookies(
      res,
      newAccessToken,
      newRefreshToken
    );

    return res.status(200).json({
      success: true,
      message: "Session refreshed",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Refresh error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        await Session.findOneAndUpdate(
          {
            _id: decoded.sessionId,
            userId: decoded.userId,
          },
          {
            $set: { revokedAt: new Date() },
          }
        );
      } catch {
        // Even if token is expired, clear browser cookies
      }
    }

    clearAuthCookies(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const logoutAll = async (req, res) => {
  try {
    await Session.updateMany(
      {
        userId: req.user.userId,
        revokedAt: null,
      },
      {
        $set: { revokedAt: new Date() },
      }
    );

    clearAuthCookies(res);

    return res.status(200).json({
      success: true,
      message: "Logged out from all devices",
    });
  } catch (error) {
    console.error("Logout all error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// auth.controller.js


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};



module.exports = {  
  signup,
  login,
  refresh,
  logout,
  logoutAll,
  getMe,
  
 };