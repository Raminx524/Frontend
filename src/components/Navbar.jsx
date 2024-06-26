import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between px-8 py-4">
      <p>Marketplace</p>
      <div className="flex gap-2">
        <Link to="/product">Products</Link>
        <Link to="/login">Log In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
}

export default Navbar;
