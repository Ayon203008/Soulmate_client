import React, { useState, useContext } from "react";
import {
  FaBars,
  FaTimes,
  FaUserEdit,
  FaRegIdBadge,
  FaRing,
  FaRegLaughBeam,
  FaPaperPlane,
  FaHeart,
  FaUsersCog,
  FaCheckCircle,
  FaChartPie,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiGloves } from "react-icons/gi";
import { NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import useUserRole from "../Hooks/useUserRole";

const SidebarLinks = () => {
  const { user } = useContext(AuthContext);
  const { isAdmin, loading } = useUserRole(user?.email);

  if (loading) return null; // optional: show loader

  return (
    <>
      {isAdmin ? (
        <>
          <NavLink
            to="/dashboard/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaChartPie /> Admin Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/manageusers"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaUsersCog /> Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/approved-contact"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaCheckCircle /> Approved Contact Requests
          </NavLink>

          <NavLink
            to="/dashboard/sucessStory-admin"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaRegLaughBeam /> Success Story Admin
          </NavLink>

          <NavLink
            to="/dashboard/approved-premium"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaRegLaughBeam /> Approved Premium
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/dashboard/editdata"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaUserEdit /> Edit BioData
          </NavLink>

          <NavLink
            to="/dashboard/view-biodata"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaRegIdBadge /> View BioData
          </NavLink>

          <NavLink
            to="/dashboard/favourites"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaHeart /> Favourite BioData
          </NavLink>

          <NavLink
            to="/dashboard/contact-requests"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaPaperPlane /> Contact Requests
          </NavLink>

          <NavLink
            to="/dashboard/got-married"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium transition ${
                isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
              }`
            }
          >
            <FaRing /> Got Married
          </NavLink>
        </>
      )}
    </>
  );
};

const DashBoardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { SignOutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    SignOutUser()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Brand */}
            <div className="flex items-center gap-2 p-6 group">
              <GiGloves size={40} className="text-rose-500 group-hover:scale-110 transition" />
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                SoulMate
              </h1>
            </div>

            {/* Links */}
            <nav className="p-6 space-y-3">
              <SidebarLinks />
              <NavLink
                to="/"
                className="flex items-center gap-3 text-gray-700 font-medium hover:text-pink-600 transition"
              >
                <FaHome /> Home
              </NavLink>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 text-gray-700 font-medium hover:text-red-500 transition mt-4"
              >
                <FaSignOutAlt /> Logout
              </button>
            </nav>
          </div>
          <div className="p-4 text-xs md:text-sm text-gray-500 border-t">
            © {new Date().getFullYear()} SoulMate. All rights reserved.
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-20">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Main Outlet */}
        <main className="p-4 md:p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
