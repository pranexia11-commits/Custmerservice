import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function AdminAuth() {
  const { loginAdmin, registerAdmin, setCurrentView } = useContext(AppContext);
  const [isRegister, setIsRegister] = useState(false);

  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Username and Password are required.");
      return;
    }

    if (isRegister) {
      if (!email.trim()) {
        setError("Email is required for registration.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);
    try {
      if (isRegister) {
        const res = await registerAdmin({ username, email, fullName, password });
        if (!res.success) {
          setError(res.message);
        }
      } else {
        const res = await loginAdmin(username, password);
        if (!res.success) {
          setError(res.message);
        }
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-slate-100 relative overflow-hidden p-4 sm:p-6">
      {/* Dynamic Purple/Indigo Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      <div className="w-full max-w-md bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-2xl shadow-purple-900/10 p-6 sm:p-8 z-10">
        
        {/* Top Back Navigation */}
        <button
          onClick={() => setCurrentView("login")}
          className="flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-800 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Portal Selection
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-white shadow-xl shadow-purple-500/20 border border-purple-100 flex items-center justify-center p-2">
                <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-1.5 rounded-full border-2 border-white shadow-md">
                <ShieldCheck size={18} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-wide uppercase">
            ADMIN PORTAL
          </h1>
          <p className="text-purple-600 font-semibold text-xs mt-1">
            System Administration & Management Access
          </p>

          {/* Toggle Switch Tabs */}
          <div className="flex bg-slate-100 border border-slate-200/80 rounded-xl p-1 mt-5">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister ? "bg-purple-600 text-white shadow-md shadow-purple-600/25" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister ? "bg-purple-600 text-white shadow-md shadow-purple-600/25" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Admin Register
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name for Registration */}
          {isRegister && (
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5 block">
                Full Name / Title
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Super Admin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* Email for Registration */}
          {isRegister && (
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="admin@superhero.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5 block">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Password */}
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

          {/* Confirm Password for Register */}
          {isRegister && (
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-1.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35 hover:scale-[1.01] cursor-pointer"
          >
            {loading ? "Processing..." : isRegister ? "Create Admin Account" : "Access Admin Dashboard"}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center mt-5 text-xs text-slate-400 font-medium">
          Admin portal restricts access to supervisors & system managers.
        </div>
      </div>
    </div>
  );
}
