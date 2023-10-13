import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

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

          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} alt="profile" />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
