"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const isFormValid =
    form.name.trim().length > 0 &&
    emailRegex.test(form.email) &&
    passwordRegex.test(form.password);

  const handleLogin = () => router.replace("/login");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isFormValid) return;

    try {
      // Signup only in Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;

      setSuccess("Signup successful! Please check your email to confirm.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            maxLength={25}
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded-md shadow-sm ring-1 ring-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded-md shadow-sm ring-1 ring-gray-300"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 pr-10 rounded-md shadow-sm ring-1 ring-gray-300"
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
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full font-bold py-2 rounded transition ${
            isFormValid
              ? "bg-[#92FC5D] shadow-[0px_0px_10px_0px_#3F8E0080] text-white hover:bg-[#62BA1B] cursor-pointer"
              : "bg-[#92FC5D] text-white cursor-not-allowed"
          }`}
        >
          Sign up
        </button>

        <p className="pt-2">
          Already have an account?{" "}
          <span onClick={handleLogin} className="text-blue-500 cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
