
const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  refresh,
  logout,
  logoutAll,
  getMe,
} = require("../controllers/authController");

const verifyAuth = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Get currently logged-in user
router.get("/me", verifyAuth, getMe);

// Logout from all devices
router.post("/logout-all", verifyAuth, logoutAll);

module.exports = router;
