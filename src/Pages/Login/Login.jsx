import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import {AuthContext} from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { LoginUser, GoogleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const form = location.state || "/";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Sign-In Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    LoginUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(form);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid email or password. Please try again.",
        });
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-yellow-50 px-4 py-20">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Image / Text */}
        <div className="md:w-1/2 bg-pink-100 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-4xl font-extrabold text-pink-600 mb-4">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-lg">
            Log in to find your perfect match 💕
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
            alt="Login Art"
            className="w-48 mt-6"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-10 space-y-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center">
            Login
          </h3>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
            >
              Loginnnn
            </button>
          </form>

          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-gray-300 w-full"></div>
            <span className="text-gray-400">OR</span>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            New here?{" "}
            <Link
              to="/register"
              className="text-pink-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
