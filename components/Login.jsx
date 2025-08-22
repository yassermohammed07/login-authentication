"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [unauthError, setUnauthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const isFormValid = emailRegex.test(email) && passwordRegex.test(password);

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setUnauthError("You must be logged in to access that page.");
    }
  }, [searchParams]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!value || emailRegex.test(value) ? "" : "Invalid email");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Optional live validation (remove if you only want to check on submit)
    setPasswordError(
      !value || passwordRegex.test(value)
        ? ""
        : "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setUnauthError("");
    setEmailError("");
    // keep whatever is in passwordError from live validation

    // Basic validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          setPasswordError("Invalid email or password");
        } else {
          setUnauthError(error.message);
        }
        return;
      }

      // Success
      sessionStorage.setItem("authenticated", "true");
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setUnauthError(err.message);
    }
  };

  const handleSignupRedirect = () => router.push("/signup");

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {unauthError && (
          <div className="text-red-600 text-center mb-4">{unauthError}</div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={handleEmailChange}
            className={`w-full p-2 rounded-md shadow-sm ${
              emailError
                ? "ring-2 ring-red-400"
                : "ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400"
            } focus:outline-none`}
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-2 pr-10 rounded-md shadow-sm ${
                passwordError
                  ? "ring-2 ring-red-400"
                  : "ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400"
              } focus:outline-none`}
              required
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FiEyeOff size={20} className="cursor-pointer" />
                ) : (
                  <FiEye size={20} className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full font-bold py-2 rounded transition ${
            isFormValid
              ? "bg-[#92FC5D] shadow-[0px_0px_10px_0px_#3F8E0080] text-white hover:bg-[#62BA1B] cursor-pointer"
              : "bg-[#92FC5D] text-white cursor-not-allowed"
          }`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleSignupRedirect}
          className="w-full font-bold py-2 rounded transition bg-[#92FC5D] text-white hover:bg-[#62BA1B] hover:shadow-[0px_8px_30px_0px_#3F8E0080] cursor-pointer mt-2"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
