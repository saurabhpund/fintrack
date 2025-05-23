import React from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
    }
  };

  React.useEffect(() => {
    document.title = "Sign Up - Finance Tracker";
  }, []);

  React.useEffect(() => {
    if (isSubmitting) {
      axios
        .post("http://localhost:8000/auth/signup", { fullName, email, password })
        .then((response) => {
          const { token } = response.data;
          // Store token
          localStorage.setItem("authToken", token);
          // Redirect user
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Signup Error:", error.response?.data || error.message);
          console.log(error)
          setErrors({ form: error.response?.data?.message || "Signup failed" });
        })
        .finally(() => setIsSubmitting(false));
    }
  }, [isSubmitting, fullName, email, password, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="container overflow-hidden flex h-screen">
      <div className="flex relative w-1/2 h-full p-4 bg-primary flex-col">
        <div className="wrapper aspect-square w-10 border-2 rounded-full border-white">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex flex-col text-center gap-3 py-5 text-white">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
          <p className="text-lg text-gray-300">
            Create an account to start tracking your finances
          </p>
          <div className="absolute rounded-full -bottom-32 aspect-square w-80 opacity-45 bg-white"></div>
        </div>
      </div>

      <div className="flex mx-auto p-4 items-center justify-center bg-white flex-col">
        <h1 className="text-4xl font-semibold mb-3">Create Account</h1>

        <form className="flex flex-col gap-4 mt-5 w-96" onSubmit={handleSubmit}>
          <div className="flex gap-4 flex-col">
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="wrapper flex p-2 border border-gray-300 rounded-md items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="************"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="wrapper" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 cursor-pointer" />
                ) : (
                  <FaEye className="text-gray-400 cursor-pointer" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

          <button type="submit" className="bg-primary text-white p-2 rounded-md">
            Sign Up
          </button>

          <div className="flex gap-2 items-center">
            <div className="bg-gray-300 h-0.5 w-1/2"></div>
            <p className="text-gray-400">or</p>
            <div className="bg-gray-300 h-0.5 w-1/2"></div>
          </div>

          <button className="bg-white flex gap-3 items-center justify-center p-2 rounded-md border border-primary">
            <FcGoogle className="" /> Sign Up with Google
          </button>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
