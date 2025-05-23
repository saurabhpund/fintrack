import React from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
      setLoading(true);
      axios
        .post("http://localhost:8000/auth/login", { email, password })
        .then((response) => {
          setLoading(false);
          const { token } = response.data;
          // Store token
          localStorage.setItem("authToken", token);
          // Redirect user
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Signup Error:", error.response?.data || error.message);
          console.log(error);
          setErrors({ form: error.response?.data?.message || "Signup failed" });
        })
        .finally(() => setIsSubmitting(false));
    }
  }, [isSubmitting, email, password, navigate]);

  React.useEffect(() => {
    if (localStorage.getItem("authtoken")) {
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
          <h1 className="text-4xl font-semibold">Login</h1>
          <p className="text-lg text-gray-300">We Miss You! For A While.</p>
        </div>
      </div>

      <div className="flex mx-auto p-4 items-center justify-center bg-white flex-col">
        <h1 className="text-4xl font-semibold mb-3">Welcome Back!</h1>

        <form className="flex flex-col gap-4 mt-5 w-96" onSubmit={handleSubmit}>
          <div className="flex gap-4 flex-col">
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
              <div
                className="wrapper"
                onClick={() => setShowPassword(!showPassword)}
              >
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
          <div className="flex transition-all duration-300 ease-in-out gap-2 "> 
            <button
              type="submit"
              className="bg-primary w-full text-white p-2 rounded-md"
            >
              Login
            </button>
            {loading && loadingCircle()}
            </div>

          <div className="flex gap-2 items-center">
            <div className="bg-gray-300 h-0.5 w-1/2"></div>
            <p className="text-gray-400">or</p>
            <div className="bg-gray-300 h-0.5 w-1/2"></div>
          </div>

          <button className="bg-white flex gap-3 items-center justify-center p-2 rounded-md border border-primary">
            <FcGoogle className="" /> Login with Google
          </button>

          <p className="text-sm text-gray-400 text-center">
            Create an account?{" "}
            <Link to="/auth/signup" className="text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const loadingCircle = () => {
  return (
    <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  );
};

export default Login;
