"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-slate-50 overflow-hidden select-none">
      {/* Background Decorative Elements - Matching Signup/Login */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 px-6 text-center max-w-3xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
            The Future of Identity
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Welcome to <span className="text-sky-500">Profily</span>
          </h1>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-8"
        >
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            <span className="text-indigo-600 font-bold italic">Profily</span> is
            a modern profile management system. Experience a seamless
            integration of
            <span className="font-bold text-slate-800"> Next.js</span>,
            <span className="font-bold text-slate-800"> Framer Motion</span>,
            and
            <span className="font-bold text-slate-800"> Express.js</span>.
          </p>

          {/* Development Note */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-flex items-center gap-3 text-sm text-amber-700 bg-amber-50/80 backdrop-blur-sm border border-amber-100 px-6 py-3 rounded-2xl shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
            <strong>Note:</strong> Testing project. Please use non-sensitive
            emails.
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/login" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all cursor-pointer text-center"
              >
                Login To Your Account
              </motion.div>
            </Link>

            <Link href="/signup" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-10 py-4 rounded-2xl shadow-lg border border-slate-100 transition-all cursor-pointer text-center"
              >
                Create Account
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-slate-400 text-sm font-medium"
      >
        Built with ❤️ for Learning
      </motion.div>
    </section>
  );
}
