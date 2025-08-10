import React, { useState, useContext } from "react";
import { NavLink } from "react-router";  // react-router থেকে NavLink
import { GiGloves } from "react-icons/gi";
import {AuthContext} from "../../../Context/AuthContext";

const Navbar = () => {
  const { user, SignOutUser } = useContext(AuthContext);


  const [menuOpen, setMenuOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/biodatas" className="ml-2" onClick={() => setMenuOpen(false)}>
          Bio Datas
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus" className="mx-2" onClick={() => setMenuOpen(false)}>
          About us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contactus" className="mr-2" onClick={() => setMenuOpen(false)}>
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
            DashBoard
          </NavLink>
        </li>
      )}
    </>
  );

  const handleLogout = () => {
    SignOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="sticky top-0 z-50 shadow-2xl p-4 dark:bg-gray-100  dark:text-gray-800 mb-20">
      <div className="container flex justify-between h-16 mx-auto items-center">
        <NavLink to="/" className="inline-block">
          <div className="flex items-center gap-2 group ml-10">
            {/* Icon */}
            <div className="text-rose-500 group-hover:scale-110 transition duration-300">
              <GiGloves size={48} />
            </div>

            {/* Brand Text */}
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text tracking-wide group-hover:tracking-wider transition-all duration-300">
              SoulMate
            </h1>
          </div>
        </NavLink>

      
        <ul className="items-stretch hidden space-x-3 lg:flex">{links}</ul>

        
        <div className="items-center flex-shrink-0 hidden lg:flex gap-3 mr-10">
          {user ? (
            <button
              onClick={handleLogout}
              className="self-center px-2 py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="self-center px-2 py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
                Login
              </button>
            </NavLink>
          )}
        </div>

      
        <button
          className="p-4 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
        
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
       
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>


      {menuOpen && (
        <nav className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2">{links}</ul>
          <div className="mt-4">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center"
              >
                <button className="w-full px-4 py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
