// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">🏝️ TravelDiaries</Link>
    <Link to="/create">➕ Create Post</Link>
  </nav>
);

export default Navbar;