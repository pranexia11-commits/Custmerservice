import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";
import { ShieldCheck, Headphones, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, LogIn } from "lucide-react";

export default function Login() {
  const { loginAdmin, loginCustomer, setCurrentView } = useContext(AppContext);
  const [selectedRole, setSelectedRole] = useState("admin"); // 'admin' or 'customer'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username and Password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let res;
      if (selectedRole === "admin") {
        res = await loginAdmin(username, password);
      } else {
        res = await loginCustomer(username, password);
      }

      if (!res.success) {
        setError(res.message);
      }
    } catch (err) {
      setError("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-slate-100 relative overflow-hidden p-4 sm:p-6">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div className="w-full max-w-xl bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-2xl shadow-indigo-900/10 p-6 sm:p-8 z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-purple-500/15 border border-purple-100 flex items-center justify-center p-2 transform hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-wider uppercase">
            SUPERHEROOO
          </h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Customer Service & Operations Portal
          </p>
        </div>

        {/* Dedicated Portal Quick Select Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Admin Panel Card */}
          <div 
            onClick={() => setCurrentView("admin-auth")}
            className="group cursor-pointer bg-gradient-to-b from-white to-purple-50/40 border border-purple-200/80 hover:border-purple-500 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/15 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-purple-700 uppercase bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
                  Full Control
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Admin Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                Dashboard, Live Calls, Reports, Bookings, Tickets, SMS, Email, WhatsApp.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-100/80 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:text-purple-700">
              <span>Login / Register</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Customer Support Card */}
          <div 
            onClick={() => setCurrentView("customer-auth")}
            className="group cursor-pointer bg-gradient-to-b from-white to-teal-50/40 border border-teal-200/80 hover:border-teal-500 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/15 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                  <Headphones size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-teal-700 uppercase bg-teal-100 px-2.5 py-1 rounded-full border border-teal-200">
                  Agent Desk
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Customer Support Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                Live Calls, Incoming & Outgoing, Bookings, Mediators, Workers, Tickets, Messaging.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-teal-100/80 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-teal-700">
              <span>Login / Register</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-4 text-xs uppercase tracking-widest text-slate-400 font-bold">
            Or Direct Express Login
          </span>
        </div>

        {/* Role Toggle for Direct Express Login */}
        <div className="flex bg-slate-100 border border-slate-200/80 rounded-xl p-1 mb-5">
          <button
            type="button"
            onClick={() => { setSelectedRole("admin"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              selectedRole === "admin" ? "bg-purple-600 text-white shadow-md shadow-purple-600/25" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck size={16} />
            Admin Express
          </button>
          <button
            type="button"
            onClick={() => { setSelectedRole("customer"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              selectedRole === "customer" ? "bg-teal-600 text-white shadow-md shadow-teal-600/25" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Headphones size={16} />
            Support Express
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Express Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5 block">
              Username or Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={selectedRole === "admin" ? "admin" : "agent_rahul"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-white cursor-pointer ${
              selectedRole === "admin"
                ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/25 hover:shadow-purple-600/35"
                : "bg-teal-600 hover:bg-teal-700 shadow-teal-600/25 hover:shadow-teal-600/35"
            }`}
          >
            <LogIn size={18} />
            {loading ? "Signing in..." : `Login to ${selectedRole === "admin" ? "Admin" : "Customer Support"} Panel`}
          </button>
        </form>

        {/* Portal Registration Links */}
        <div className="mt-6 flex items-center justify-around text-xs font-bold pt-4 border-t border-slate-200/80">
          <button
            onClick={() => setCurrentView("admin-auth")}
            className="flex items-center gap-1.5 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <UserPlus size={14} />
            Register as Admin
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => setCurrentView("customer-auth")}
            className="flex items-center gap-1.5 text-teal-600 hover:text-teal-800 transition-colors"
          >
            <UserPlus size={14} />
            Register as Support Agent
          </button>
        </div>
      </div>
    </div>
  );
}