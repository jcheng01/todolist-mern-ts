import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="nav">
        <Link to="/">
          <h1>
            Todo<span>List</span>
          </h1>
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <FaSearch />
        </form>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/signup">
            <li>Sign in</li>
          </Link>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
