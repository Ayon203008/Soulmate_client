import React, { useContext, useState } from "react";
import {AuthContext} from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, GoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // ✅ State for Show/Hide

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;

    // ✅ Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

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

  return (
    <section className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-yellow-50 py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
            Create Your Account
          </h2>
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* ✅ Password Field with Show/Hide */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Your password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-4 text-sm text-pink-600 font-medium focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
              <input
                type="url"
                name="photo"
                required
                placeholder="https://your-photo-url.com"
                className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"
            >
              Register
            </button>

            <div className="text-center">
              <p className="mt-4 font-medium text-gray-500">Or</p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-white border border-gray-300 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>

        {/* Illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-72 h-72 mx-auto"
              fill="none"
              stroke="#ec4899"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="32" cy="32" r="30" fill="#fce7f3" />
              <path d="M20 28c0-6 12-6 12 0 0 6-12 6-12 0z" fill="#ec4899" />
              <path d="M32 40v12" />
              <path d="M26 52h12" />
              <path d="M20 36v4h24v-4" />
              <circle cx="18" cy="20" r="4" fill="#ec4899" />
              <circle cx="46" cy="20" r="4" fill="#ec4899" />
            </svg>
            <p className="mt-6 text-center text-pink-600 font-semibold text-lg">
              Your journey to love starts here!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
