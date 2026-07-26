import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  PhoneCall,
  Send,
  MessageSquare,
  Mail,
  Shield,
  Smartphone,
  HardHat,
  Search,
  CheckCheck,
  User,
  Trash
} from "lucide-react";

// ==========================================
// 1. OUTGOING CALLS (Dialer Pad)
// ==========================================
export function OutgoingCallsView() {
  const { triggerIncomingCall } = useContext(AppContext);
  const [dialNum, setDialNum] = useState("");

  const handleDial = (num) => {
    if (dialNum.length < 15) {
      setDialNum(prev => prev + num);
    }
  };

  const handleClear = () => setDialNum("");
  const handleCall = () => {
    if (!dialNum) return;
    alert(`Initiating simulated outbound call to ${dialNum}...`);
    // Simulate connection by triggering incoming pop after 2 seconds
    setTimeout(() => {
      triggerIncomingCall("Home Owner");
    }, 1500);
  };

  return (
    <div className="w-full max-w-[360px] mx-auto bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
          <PhoneCall className="w-4.5 h-4.5" />
        </div>
        <h3 className="font-bold text-base text-slate-900">Outbound Dialer</h3>
      </div>

      {/* Screen */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 min-h-[56px] flex items-center justify-between gap-2">
        <span className="text-xl font-mono font-bold text-slate-900 tracking-wider tabular-nums truncate">
          {dialNum || <span className="text-slate-300 tracking-normal font-sans font-medium text-base">Enter number...</span>}
        </span>
        {dialNum && (
          <button onClick={handleClear} className="text-xs font-bold text-rose-500 hover:text-rose-600 cursor-pointer flex-shrink-0 uppercase tracking-wide">
            Clear
          </button>
        )}
      </div>

      {/* Keys */}
      <div className="grid grid-cols-3 gap-3 justify-items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((key) => (
          <button
            key={key}
            onClick={() => handleDial(key)}
            className="w-16 h-16 rounded-full bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-xl font-bold font-mono text-slate-700 hover:text-indigo-600 transition-all cursor-pointer active:scale-90"
          >
            {key}
          </button>
        ))}
      </div>

      {/* Actions */}
      <button
        onClick={handleCall}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-transform active:scale-[0.98] text-sm"
      >
        <PhoneCall className="w-4.5 h-4.5 fill-current" />
        <span>Place Simulated Call</span>
      </button>
    </div>
  );
}

// ==========================================
// 2. WORKERS DIRECTORY
// ==========================================
export function WorkersView() {
  const [search, setSearch] = useState("");
  const workers = [
    { name: "John Doe", skill: "Electrician", status: "Active", rating: "4.9", phone: "+91 99001 12233" },
    { name: "Sam Wilson", skill: "Painter", status: "On Job", rating: "4.7", phone: "+91 99001 44556" },
    { name: "Bruce Banner", skill: "Mason", status: "Active", rating: "4.8", phone: "+91 99001 77889" },
    { name: "Steve Rogers", skill: "Security", status: "Active", rating: "5.0", phone: "+91 99001 99001" },
    { name: "Tony Stark", skill: "Electrician", status: "On Job", rating: "4.9", phone: "+91 99001 22334" },
    { name: "Natasha Romanoff", skill: "Cleaner", status: "Active", rating: "4.9", phone: "+91 99001 55667" },
    { name: "Thor Odinson", skill: "Helper", status: "Break", rating: "4.5", phone: "+91 99001 88990" },
    { name: "Clint Barton", skill: "Driver", status: "Active", rating: "4.6", phone: "+91 99001 11224" }
  ];

  const filtered = workers.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by worker name or specialized skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((w, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 py-0.5 px-2 rounded-full uppercase tracking-wide">
                  {w.skill}
                </span>
                <h4 className="font-bold text-slate-900 mt-2">{w.name}</h4>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                w.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                w.status === "On Job" ? "bg-blue-50 text-blue-700 border-blue-100" :
                "bg-amber-50 text-amber-700 border-amber-100"
              }`}>
                {w.status}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold text-amber-500">★ {w.rating}</span>
              <span className="font-mono font-semibold text-slate-500">{w.phone}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-14 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mb-3">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-slate-400">No workers match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. SIMULATED WHATSAPP PANEL
// ==========================================
export function WhatsAppView() {
  const [messages, setMessages] = useState([
    { sender: "client", text: "Hello, has the mason reached Gachibowli site?", time: "10:30 AM" },
    { sender: "you", text: "Yes, Ramesh is on-site and supervising 25 workers.", time: "10:32 AM" },
    { sender: "client", text: "Excellent, thank you for quick dispatch!", time: "10:33 AM" }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    
    const newMsg = {
      sender: "you",
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputVal("");

    // Mock client response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: "client",
          text: "Received! Let us sync on the invoice details tomorrow.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto h-[520px] bg-slate-100 border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">
          AB
        </div>
        <div>
          <h4 className="text-sm font-bold">ABC Builders</h4>
          <span className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wide animate-pulse">Online</span>
        </div>
      </div>

      {/* Messages Board */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#efeae2]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] p-3 rounded-2xl text-sm ${
              m.sender === "you"
                ? "bg-[#dcf8c6] text-slate-800 ml-auto rounded-tr-none shadow-sm"
                : "bg-white text-slate-800 rounded-tl-none shadow-sm"
            }`}
          >
            <p>{m.text}</p>
            <span className="text-[9px] text-slate-400 block text-right mt-1.5 font-bold">
              {m.time} {m.sender === "you" && <span className="text-blue-500 font-bold ml-1">✓✓</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-3.5 bg-slate-50 border-t border-slate-200 flex gap-2">
        <input
          type="text"
          placeholder="Type a WhatsApp message..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition-all"
        />
        <button type="submit" className="w-10 h-10 rounded-xl bg-[#128c7e] hover:bg-[#075e54] text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0">
          <Send className="w-4 h-4 fill-current" />
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 4. SIMULATED SMS
// ==========================================
export function SMSView() {
  const [messages, setMessages] = useState([
    { text: "Alert: Ramesh assigned for project Kondapur at 11:30 AM.", date: "July 23, 2026" },
    { text: "Alert: Booking confirmation code SH-1025.", date: "July 23, 2026" }
  ]);
  const [phone, setPhone] = useState("");
  const [smsText, setSmsText] = useState("");

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (!phone || !smsText) return;
    
    setMessages(prev => [{ text: `SMS to ${phone}: ${smsText}`, date: "Today" }, ...prev]);
    setSmsText("");
    alert(`SMS broadcast sent successfully to ${phone}!`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <form onSubmit={handleSendSMS} className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Smartphone className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">SMS Broadcast Dispatch</h3>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recipient Phone</label>
          <input
            type="text"
            placeholder="e.g. +91 99887 76655"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message Body</label>
          <textarea
            placeholder="Write SMS message content..."
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            required
            rows="3"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all resize-none"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] cursor-pointer">
          <Smartphone className="w-4 h-4" />
          <span>Send SMS Broadcast</span>
        </button>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Outgoing SMS Logs
        </h3>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {messages.map((sms, i) => (
            <div key={i} className="p-3.5 border border-slate-100 bg-slate-50/60 rounded-xl space-y-1">
              <p className="text-sm font-semibold text-slate-800">{sms.text}</p>
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">{sms.date} &bull; Sent via carrier routing</span>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-semibold text-slate-400">No SMS logs yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. SIMULATED EMAIL INBOX
// ==========================================
export function EmailView() {
  const [emails, setEmails] = useState([
    { to: "developer@abcbuilders.com", subject: "Mediator Assignment SH-1024", body: "Ramesh has been assigned with 25 workers on location Gachibowli." },
    { to: "support@xyzinfra.in", subject: "Invoice Details Pending Reconcile", body: "Pending invoice of ₹12,500 due on July 30, 2026." }
  ]);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!to || !subject || !body) return;
    
    setEmails(prev => [{ to, subject, body }, ...prev]);
    setTo("");
    setSubject("");
    setBody("");
    alert(`Email successfully queued for delivery to ${to}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      <form onSubmit={handleSendEmail} className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Mail className="w-4.5 h-4.5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Compose Email</h3>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recipient</label>
          <input
            type="email"
            placeholder="developer@client.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
          <input
            type="text"
            placeholder="Job Dispatch Logs..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
          <textarea
            placeholder="Write email body text..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="3"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all resize-none"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] cursor-pointer">
          <Mail className="w-4 h-4" />
          <span>Send SMTP Email</span>
        </button>
      </form>

      <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Outbox Logs
        </h3>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {emails.map((e, idx) => (
            <div key={idx} className="p-4 border border-slate-100 bg-slate-50/60 rounded-xl text-left space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-indigo-600">{e.to}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-full">Queued</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{e.subject}</h4>
              <p className="text-xs text-slate-500 italic mt-1">&ldquo;{e.body}&rdquo;</p>
            </div>
          ))}

          {emails.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-semibold text-slate-400">No emails sent yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. AGENTS DIRECTORY
// ==========================================
export function AgentsView() {
  const { agents } = useContext(AppContext);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {agents.map((a, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Avatar block with status lights */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl relative">
              {a.name[0]}
              <div className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border-4 border-white ${
                a.status === "Available" ? "bg-emerald-500" :
                a.status === "Talking" ? "bg-blue-500 animate-pulse" :
                a.status === "Break" ? "bg-amber-500" : "bg-slate-400"
              }`} />
            </div>

            <div>
              <h4 className="font-bold text-slate-900">{a.name}</h4>
              <p className="text-xs text-slate-400">Agent Representative</p>
            </div>

            <span className={`text-xs font-bold py-1 px-3.5 rounded-full border ${a.badgeColor}`}>
              {a.status}
            </span>

            <div className="w-full border-t border-slate-100 pt-3 flex justify-around text-[10px] text-slate-400 font-bold uppercase tracking-wide">
              <span>CSAT: 4.8</span>
              <span>Calls: {Math.floor(Math.random() * 30) + 10}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
