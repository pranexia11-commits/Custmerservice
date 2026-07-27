import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Award, CheckCircle, MapPin, Users, HelpCircle, Star, ArrowLeft } from "lucide-react";

export default function MediatorAssignment() {
  const {
    bookings,
    pendingBookingId,
    setPendingBookingId,
    assignMediator,
    mediators,
    setCurrentView
  } = useContext(AppContext);

  const [selectedMediator, setSelectedMediator] = useState("");

  const activePendingBooking =
    bookings.find((b) => b.id === pendingBookingId) ||
    bookings.find((b) => b.status === "Pending");

  useEffect(() => {
    if (mediators.length > 0) {
      setSelectedMediator(mediators[0].name);
    }
    if (activePendingBooking && !pendingBookingId) {
      setPendingBookingId(activePendingBooking.id);
    }
  }, [activePendingBooking, pendingBookingId, mediators, setPendingBookingId]);

  if (!activePendingBooking) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-slate-100 dark:bg-slate-950 p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-950">
            <HelpCircle className="h-7 w-7" />
          </div>
          <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            No Pending Mediator Assignments
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            All bookings currently have assigned mediators. You can create a new booking to test this dispatcher flow!
          </p>
        </div>
      </div>
    );
  }

  const handleAssign = () => {
    if (!selectedMediator) {
      alert("Please select a mediator first.");
      return;
    }
    assignMediator(selectedMediator);
    alert(`Mediator ${selectedMediator} assigned to Booking ${activePendingBooking.id} successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Dispatch Center
            </div>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              Mediator Assignment
            </h2>
          </div>

          <button
            onClick={() => setCurrentView("bookings")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[280px,1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl bg-indigo-50 px-4 py-3 dark:bg-indigo-950/30">
              <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
                Active Booking
              </div>
              <div className="mt-1 font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400">
                #{activePendingBooking.id}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <StatRow icon={<Users className="h-4 w-4" />} label="Workers" value={`${activePendingBooking.workers} Workers`} />
              <StatRow icon={<MapPin className="h-4 w-4" />} label="Location" value={activePendingBooking.location} />
              <StatRow icon={<Star className="h-4 w-4" />} label="Status" value="Pending" />
            </div>
          </aside>

          <main className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <Award className="h-4 w-4 text-indigo-600" />
                  Available Mediators
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  Ordered by nearest proximity
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid gap-3">
                  {mediators.map((med, idx) => {
                    const isChecked = selectedMediator === med.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedMediator(med.name)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all ${
                          isChecked
                            ? "border-indigo-500 bg-indigo-50/70 dark:border-indigo-500/60 dark:bg-indigo-950/20"
                            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                              isChecked
                                ? "border-indigo-500 bg-indigo-600 text-white"
                                : "border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900"
                            }`}
                          >
                            <div className={`h-2.5 w-2.5 rounded-full ${isChecked ? "bg-white" : "bg-slate-300"}`} />
                          </div>

                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              {med.name} Representative
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Rating: ★ {med.rating}
                            </div>
                          </div>
                        </div>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {med.distance} Away
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                Ready to assign mediator
              </div>

              <button
                onClick={handleAssign}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
              >
                <CheckCircle className="h-4 w-4" />
                Assign
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {icon}
        {label}
      </div>
      <div className="max-w-[55%] truncate text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}