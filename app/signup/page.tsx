"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  // 1. Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 2. Status States (Error & Loading)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 3. Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message
    setIsLoading(true); // Show loading state

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Redirect to login page
        router.push("/login");
      } else {
        // API Error: Set the error message from server
        setError(data.message || "An error occurred during signup");
      }
    } catch (err) {
      // Network Error
      setError(
        "Internal API error. Make sure your Next.js server is running correctly."
      );
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-slate-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

      {/* Floating Home Button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-10"
      >
        <Link
          href={"/"}
          className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 font-medium hover:shadow-md transition-shadow active:scale-95"
        >
          🏠 <span className="text-slate-600">Home</span>
        </Link>
      </motion.div>

      {/* Main Form Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-md p-8 mx-4 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to <span className="text-sky-500">Profily</span>
          </h1>
          <p className="text-slate-500 mt-2">Join us and start your journey</p>
        </div>

        {/* 4. Display Error Message if exists */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2"
          >
            <span>⚠️</span> {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-slate-700 ml-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              placeholder="johndoe"
              className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700 ml-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="hello@example.com"
              className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <motion.button
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full text-white font-bold py-4 rounded-2xl shadow-lg transition-colors ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-slate-500 text-sm">Already have an account?</p>
          <Link
            href={"/login"}
            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors flex items-center gap-1 group"
          >
            Login here{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
