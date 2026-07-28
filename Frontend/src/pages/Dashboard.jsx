import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {
  Phone,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  CircleDollarSign,
  Play,
  User,
  Radio,
  ExternalLink,
  Activity,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const {
    stats,
    bookings,
    agents,
    liveCalls,
    activeCall,
    setCurrentView,
    setPendingBookingId,
    triggerIncomingCall
  } = useContext(AppContext);

  // Live clock -- purely presentational, does not touch any context/business logic
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const dateString = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  // Derived, real metrics from existing stats -- no invented data
  const answerRate = stats.calls > 0 ? Math.round((stats.answered / stats.calls) * 100) : 0;
  const missedRate = stats.calls > 0 ? Math.round((stats.missed / stats.calls) * 100) : 0;

  const statCards = [
    {
      label: "Calls",
      value: stats.calls,
      icon: Phone,
      accent: "text-indigo-600",
      iconBg: "bg-indigo-50 text-indigo-600",
      bar: "bg-indigo-500",
      caption: "Total today"
    },
    {
      label: "Waiting",
      value: stats.waiting,
      icon: Clock,
      accent: "text-amber-600",
      iconBg: "bg-amber-50 text-amber-600",
      bar: "bg-amber-500",
      caption: "In queue now"
    },
    {
      label: "Answered",
      value: stats.answered,
      icon: CheckCircle,
      accent: "text-emerald-600",
      iconBg: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-500",
      caption: `${answerRate}% answer rate`
    },
    {
      label: "Missed",
      value: stats.missed,
      icon: AlertTriangle,
      accent: "text-rose-600",
      iconBg: "bg-rose-50 text-rose-600",
      bar: "bg-rose-500",
      caption: `${missedRate}% of total`
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Ops header strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/25">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">Live Operations</h2>
            <p className="text-xs text-slate-500 font-semibold">{dateString}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">All Systems Normal</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 font-mono text-sm font-bold text-slate-700 tabular-nums">
            {timeString}
          </div>
        </div>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="relative overflow-hidden p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between h-36 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                  {card.label}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>

              <div>
                <span className="text-3xl font-black text-slate-900 tracking-tight font-mono leading-none">
                  {card.value}
                </span>
                <p className={`text-xs font-semibold mt-2 ${card.accent}`}>{card.caption}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-50">
                <div className={`h-full ${card.bar}`} style={{ width: "100%" }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Live Calls */}
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              <h3 className="font-bold text-base text-slate-900">
                Live Calls
                <span className="ml-1.5 font-mono text-slate-400 font-semibold">
                  ({liveCalls.length + (activeCall ? 1 : 0)})
                </span>
              </h3>
            </div>
            <button
              onClick={() => setCurrentView("live-calls")}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Supervisor Monitor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Show incoming call dynamically if ringing */}
            {activeCall && (
              <div
                onClick={() => setCurrentView("incoming-calls")}
                className="group flex items-center justify-between p-4 rounded-xl border border-rose-200 bg-rose-50/60 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center animate-pulse">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-950">
                      Ringing <span className="text-xs text-rose-400 font-medium">→</span> {activeCall.customerName}
                    </h4>
                    <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">
                      Incoming Call Pop Active
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-100 py-1.5 px-3 rounded-lg border border-rose-200">
                  Ringing...
                </span>
              </div>
            )}

            {liveCalls.map((call) => (
              <div
                key={call.id}
                onClick={() => setCurrentView("live-calls")}
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {call.agent[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {call.agent} <span className="text-xs text-slate-400 font-medium">→</span> {call.customer}
                    </h4>
                    <p className="text-xs text-slate-400">Ongoing line connection</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-600 bg-white py-1.5 px-3 rounded-lg border border-slate-200">
                    {call.duration}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}

            {liveCalls.length === 0 && !activeCall && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mb-3">
                  <Play className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-slate-400">No active calls right now</p>
              </div>
            )}
          </div>
        </div>

        {/* Queue snapshot -- derived purely from existing stats, no invented data */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 mb-5">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Queue Snapshot</h3>
          </div>

          <div className="space-y-5 flex-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Answer rate</span>
                <span className="text-sm font-black text-emerald-600 font-mono">{answerRate}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${answerRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missed rate</span>
                <span className="text-sm font-black text-rose-600 font-mono">{missedRate}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${missedRate}%` }} />
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Waiting</p>
                <p className="text-xl font-black text-amber-700 font-mono mt-1">{stats.waiting}</p>
              </div>
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3">
                <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">In Progress</p>
                <p className="text-xl font-black text-indigo-700 font-mono mt-1">
                  {liveCalls.length + (activeCall ? 1 : 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Today's Bookings */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Today's Bookings</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Track and dispatch jobs requested by developers and homeowners
            </p>
          </div>
          <button
            onClick={() => setCurrentView("bookings")}
            className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Workers Required</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Assigned Mediator</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {booking.customer}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {booking.location}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700 font-mono">
                    {booking.workers}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      booking.status === "Assigned"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                        : "bg-amber-50 border-amber-100 text-amber-700 animate-pulse"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        booking.status === "Assigned" ? "bg-emerald-500" : "bg-amber-500"
                      }`} />
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {booking.mediator ? (
                      <span className="inline-flex items-center gap-1.5 text-slate-900 font-bold">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                        {booking.mediator}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-rose-600 font-bold animate-pulse bg-rose-50 border border-rose-100 py-1 px-2.5 rounded-lg text-xs">
                        <User className="w-3.5 h-3.5" />
                        Awaiting Agent
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {booking.status === "Pending" ? (
                      <button
                        onClick={() => {
                          setPendingBookingId(booking.id);
                          setCurrentView("mediators"); // Jump directly to Mediator Assignment View
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Assign Mediator
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentView("bookings")}
                        className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
