import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const { login } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] =useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email address is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("");

    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden relative p-4">

      {/* Background Glow */}

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>

      {/* Login Card */}

      <div className="w-full max-w-md bg-slate-950/70 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 z-10">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="flex justify-center mb-5">

            <div className="w-28 h-28 rounded-full bg-white shadow-2xl shadow-indigo-600/30 flex items-center justify-center">

              <img
  src={logo}
  alt="Company Logo"
  className="w-24 h-24 object-contain"
/>

            </div>

          </div>

          <h1 className="text-3xl font-bold text-white tracking-wide uppercase">
            SUPERHEROOO
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Customer Service CRM
          </p>

        </div>

        {/* Error */}

        {error && (

          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">

            {error}

          </div>

        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2 block">

              Email Address

            </label>

            <div className="relative">

              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />

              <input
                type="email"
                placeholder="agent@company.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2 block">

              Password

            </label>

            <div className="relative">

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >

                {showPassword ? (
                  <EyeOff size={20}/>
                ) : (
                  <Eye size={20}/>
                )}

              </button>

            </div>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
          >

            Login

            <ArrowRight size={18}/>

          </button>

        </form>

        {/* Forgot Password */}

        <div className="text-center mt-6">

          <button
            className="text-indigo-400 hover:text-indigo-300 text-sm"
          >
            Forgot Password?
          </button>

        </div>

      </div>

    </div>
  );
}