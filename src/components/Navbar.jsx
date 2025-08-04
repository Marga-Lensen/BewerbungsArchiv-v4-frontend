// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navlink">🏠 Home</NavLink>
      <NavLink to="/upload" className="navlink">Upload</NavLink>
      <NavLink to="/submissions" className="navlink">Submissions</NavLink>
      <NavLink to="/dashboard" className="navlink">DevDashboard</NavLink>
    </nav>
  );
};

export default Navbar;
