"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  // 1. Local States
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // For success/error feedback
  const [isLoading, setIsLoading] = useState(false);

  // 2. Load User Data on Mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/login"); // Redirect if not logged in
    } else {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setNewUsername(parsedUser.username); // Pre-fill the username input
    }
  }, [router]);

  // 3. Handle Update Logic (PATCH)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          newUsername,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        // Update local user data
        const updatedUser = { ...user!, username: newUsername };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setNewPassword(""); // Clear password field for security
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error with server" });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Logout Logic
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-4">
      {/* Home Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/"
          className="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar: User Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white h-fit"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-4 text-indigo-600">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-slate-800">{user.username}</h2>
          <p className="text-slate-500 text-sm mb-6">{user.email}</p>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl border border-red-100 text-red-500 font-semibold hover:bg-red-50 transition-colors"
          >
            Log Out
          </button>
        </motion.div>

        {/* Main Content: Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Edit Profile
          </h3>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-2xl text-sm font-medium ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              {message.type === "success" ? "✅ " : "⚠️ "}
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                New Password (Optional)
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
              }`}
            >
              {isLoading ? "Saving Changes..." : "Update Profile"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
