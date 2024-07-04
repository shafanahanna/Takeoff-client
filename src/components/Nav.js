import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/signin");
    setShowDropdown(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-background">
        <div className="user-icon" onClick={toggleDropdown}>
          <FaRegCircleUser />
        </div>
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>
                <Link to="/signin" onClick={() => setShowDropdown(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signin" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
