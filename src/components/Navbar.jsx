import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="px-10 py-6  shadow-sm bg-white">
      <div className="flex justify-between max-w-7xl m-auto">
        <Link to="/" className="text-blue-900">
          Marketplace
        </Link>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Products
          </Link>
          <Link
            to="/login"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="text-blue-900 border-b border-transparent hover:border-current"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
