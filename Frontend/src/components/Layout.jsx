import logo from "../assets/logo.png";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  LayoutDashboard,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  History,
  Users,
  CalendarDays,
  Award,
  HardHat,
  Ticket,
  MessageSquare,
  Mail,
  BarChart3,
  ShieldAlert,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Volume2,
  Bell
} from "lucide-react";

export default function Layout({ children }) {
  const {
    currentView,
    setCurrentView,
    activeUser,
    logout,
    activeCall,
    triggerIncomingCall,
    activeSosCount
  } = useContext(AppContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!activeUser) return <>{children}</>;

  const isAdmin = activeUser?.role === 'Admin' || activeUser?.rawRole === 'admin';

  const allMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "live-calls", label: "Live Calls", icon: PhoneCall },
    { id: "incoming-calls", label: "Incoming Calls", icon: PhoneIncoming, badge: activeCall ? "Active" : null },
    { id: "outgoing-calls", label: "Outgoing Calls", icon: PhoneOutgoing },
    { id: "call-history", label: "Call History", icon: History },
    { id: "customers", label: "Customers", icon: Users },
    { id: "bookings", label: isAdmin ? "Bookings" : "Customer Bookings", icon: CalendarDays },
    { id: "mediators", label: "Mediator", icon: Award },
    { id: "workers", label: "Workers", icon: HardHat },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "sms", label: "SMS", icon: MessageSquare },
    { id: "email", label: "Email", icon: Mail },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: SettingsIcon }
  ];

  // Specific menu item lists according to role requirements:
  // Admin: dashboard, livecalls, callhistory, bookings, customers, tickets, reports, emails, sms, whatsapp
  const adminIds = ["dashboard", "live-calls", "call-history", "bookings", "customers", "tickets", "reports", "email", "sms", "whatsapp"];

  // Customer Support: dashboard, livecalls, incoming calls, outgoing calls, callhistory, customer bookings, mediator, workers, ticket, whatsapp, sms, email, settings
  const supportIds = ["dashboard", "live-calls", "incoming-calls", "outgoing-calls", "call-history", "bookings", "mediators", "workers", "tickets", "whatsapp", "sms", "email", "settings"];

  const menuItems = allMenuItems.filter(item => {
    if (isAdmin) {
      return adminIds.includes(item.id);
    } else {
      return supportIds.includes(item.id);
    }
  });


  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white text-slate-900 border-r border-slate-200/80 h-full transition-all duration-300 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200/80">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border border-purple-100 flex-shrink-0">
            <img
              src={logo}
              alt="Superherooo Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-sm leading-none text-slate-900 tracking-wide">SUPERHEROOO</h1>
            <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-widest">
              {isAdmin ? "Admin Panel" : "Customer Support"}
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-purple-600 group-hover:scale-110"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    item.badge === "Active" ? "bg-rose-500 text-white animate-pulse" : "bg-purple-100 text-purple-700 border border-purple-200"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200/80">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile Toggle Menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-900/40 backdrop-blur-sm">
          <aside className="w-64 bg-white text-slate-900 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200 border-r border-slate-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border border-purple-100 flex-shrink-0">
                  <img
                    src={logo}
                    alt="Superherooo Logo"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <span className="font-extrabold text-sm text-slate-900">SUPERHEROOO</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/25"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        item.badge === "Active" ? "bg-rose-500 text-white animate-pulse" : "bg-purple-100 text-purple-700"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between gap-4 z-40 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-violet-200/50"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex flex-col">
              <h2 className="text-xl font-extrabold text-slate-950 capitalize tracking-tight">
                {currentView.replace("-", " ")}
              </h2>
              <p className="text-xs text-slate-500 font-semibold">Superhero CRM & Dial Panel Dashboard</p>
            </div>
          </div>

          {/* Center Call Alert Indicator */}
          {activeCall && (
            <button
              onClick={() => setCurrentView("incoming-calls")}
              className="flex items-center gap-3 px-4 py-2 border border-rose-200 bg-rose-50 text-rose-600 rounded-full animate-pulse-slow shadow-md hover:shadow-lg shadow-rose-100 transition-all cursor-pointer"
            >
              <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              <span className="text-xs font-bold tracking-wide">
                ACTIVE INCOMING CALL: {activeCall.customerName}
              </span>
            </button>
          )}

          {/* SOS Alert Banner */}
          {activeSosCount > 0 && (
            <div
              className="flex items-center gap-2.5 px-4 py-2 border border-red-200 bg-red-50 text-red-650 rounded-full shadow-md animate-pulse shadow-red-100 font-extrabold text-xs uppercase tracking-wide"
            >
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
              <span>🚨 SOS Alerts: {activeSosCount} Active</span>
            </div>
          )}

          {/* Top Actions */}
          <div className="flex items-center gap-4">
            {/* Simulation Trigger */}
            <button
              onClick={() => {
                const clients = ["ABC Builders", "XYZ Infra", "Home Owner"];
                const randomClient = clients[Math.floor(Math.random() * clients.length)];
                triggerIncomingCall(randomClient);
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-violet-700 hover:text-white hover:bg-violet-600 border border-violet-200/60 transition-all duration-200 shadow-sm cursor-pointer hover:scale-[1.02]"
            >
              <Bell className="w-4 h-4 animate-bounce" />
              <span>Simulate Call</span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-violet-200/60">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-sm font-extrabold text-slate-950 leading-tight">{activeUser.name}</span>
                <span className="text-[10px] text-violet-600 font-bold uppercase tracking-wider">{activeUser.role}</span>
              </div>
              <img
                src={activeUser.avatar}
                alt={activeUser.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-500/20 shadow-md shadow-violet-100"
              />
            </div>
          </div>
        </header>

        {/* Content Render */}
        <main className="flex-1 overflow-y-auto relative p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
