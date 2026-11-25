import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Digital Chok
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <button className="profile-btn">
        Profile
      </button>
    </nav>
  );
}

export default Navbar;