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
  FaStar,
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
  return (
    <>
      {isAdmin && (
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

          <>
            <NavLink
              to="/dashboard/manageusers"
              className={({ isActive }) =>
                `flex items-center gap-3 font-medium transition ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`
              }
            >
              <FaUsersCog /> Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/approved-contact"
              className={({ isActive }) =>
                `flex items-center gap-3 font-medium transition ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`
              }
            >
              <FaCheckCircle /> Approved Contact Request
            </NavLink>
            <NavLink
              to="/dashboard/sucessStory-admin"
              className={({ isActive }) =>
                `flex items-center gap-3 font-medium transition ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`
              }
            >
              <FaRegLaughBeam /> Success Story Admin
            </NavLink>
            <NavLink
              to="/dashboard/approved-premium"
              className={({ isActive }) =>
                `flex items-center gap-3 font-medium transition ${
                  isActive
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`
              }
            >
              <FaRegLaughBeam /> Approved Premium
            </NavLink>
          </>
        </>
      )}

{!isAdmin && (
       <>
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
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-300 flex">
      {/* Sidebar */}
      <div
        className={`sticky top-0 left-0 z-40 h-screen w-64 bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 group p-6">
              {/* Icon */}
              <div className="text-rose-500 group-hover:scale-110 transition duration-300">
                <GiGloves size={48} />
              </div>

              {/* Brand Text */}
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text tracking-wide group-hover:tracking-wider transition-all duration-300">
                SoulMate
              </h1>
            </div>
            <nav className="p-6 space-y-4">
              <SidebarLinks />
              <NavLink
                to="/"
                className="flex items-center gap-3 text-gray-700 font-medium hover:text-pink-600 transition"
              >
                <FaHome /> Home
              </NavLink>

              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 text-gray-700 font-medium hover:text-red-500 transition mt-6"
              >
                <FaSignOutAlt /> Logout
              </button>
            </nav>
          </div>

          <div className="p-6 text-sm text-gray-500 border-t">
            © {new Date().getFullYear()} SoulMate. All rights reserved.
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar (Mobile only) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        <main className="p-6 md:p-10 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
