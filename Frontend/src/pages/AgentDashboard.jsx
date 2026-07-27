import React, { useState } from "react";
import {
  LayoutDashboard,
  Phone,
  PhoneCall,
  CalendarDays,
  User,
  LogOut,
  Bell,
  MapPin,
  Clock,
  CheckCircle
} from "lucide-react";

export default function AgentDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const incomingCalls = [
    {
      id: 1,
      customer: "Ramesh",
      phone: "9876543210",
      location: "Hyderabad",
    },
    {
      id: 2,
      customer: "Suresh",
      phone: "9123456789",
      location: "Warangal",
    },
  ];

  const liveCalls = [
    {
      id: 1,
      customer: "Priya",
      duration: "03:42",
      status: "Active",
    },
    {
      id: 2,
      customer: "Kiran",
      duration: "07:16",
      status: "Active",
    },
  ];

  const bookings = [
    {
      id: 1,
      customer: "Ravi",
      location: "Hyderabad",
      workers: 2,
      status: "Assigned",
    },
    {
      id: 2,
      customer: "Mahesh",
      location: "Secunderabad",
      workers: 1,
      status: "Assigned",
    },
  ];

  const renderContent = () => {
    switch (activeMenu) {

      case "dashboard":
        return (
          <>
            <h2>Dashboard</h2>

            <div className="cards">

              <div className="card">
                <Phone size={28}/>
                <h3>12</h3>
                <p>Incoming Calls</p>
              </div>

              <div className="card">
                <PhoneCall size={28}/>
                <h3>5</h3>
                <p>Live Calls</p>
              </div>

              <div className="card">
                <CalendarDays size={28}/>
                <h3>18</h3>
                <p>My Bookings</p>
              </div>

              <div className="card">
                <CheckCircle size={28}/>
                <h3>96%</h3>
                <p>Performance</p>
              </div>

            </div>
          </>
        );

      case "incoming":
        return (
          <>
            <h2>Incoming Calls</h2>

            {incomingCalls.map(call=>(
              <div className="listCard" key={call.id}>
                <h3>{call.customer}</h3>

                <p>{call.phone}</p>

                <span>{call.location}</span>
              </div>
            ))}
          </>
        );

      case "live":
        return (
          <>
            <h2>Live Calls</h2>

            {liveCalls.map(call=>(
              <div className="listCard" key={call.id}>
                <h3>{call.customer}</h3>

                <p>{call.duration}</p>

                <span>{call.status}</span>
              </div>
            ))}
          </>
        );

      case "bookings":
        return (
          <>
            <h2>My Bookings</h2>

            <table>

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Workers</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {bookings.map(book=>(
                  <tr key={book.id}>
                    <td>{book.customer}</td>
                    <td>{book.location}</td>
                    <td>{book.workers}</td>
                    <td>{book.status}</td>
                  </tr>
                ))}

              </tbody>

            </table>
          </>
        );

              case "profile":
        const agent = JSON.parse(localStorage.getItem("agent"));

        return (
          <>
            <h2>My Profile</h2>

            <div className="profileCard">

              <div className="avatar">
                <User size={60}/>
              </div>

              <h3>{agent?.name}</h3>

              <p>Agent ID : {agent?.id}</p>

              <p>{agent?.email}</p>

              <p>{agent?.phone}</p>

            </div>
          </>
        );

      default:
        return (
          <h2>Dashboard</h2>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >

      {/* Sidebar */}

      <div
        style={{
          width: "260px",
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          padding: "25px",
        }}
      >

        <h2
          style={{
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          Agent Portal
        </h2>

        <Menu
          icon={<LayoutDashboard size={20}/>}
          text="Dashboard"
          active={activeMenu==="dashboard"}
          onClick={()=>setActiveMenu("dashboard")}
        />

        <Menu
          icon={<Bell size={20}/>}
          text="Incoming Calls"
          active={activeMenu==="incoming"}
          onClick={()=>setActiveMenu("incoming")}
        />

        <Menu
          icon={<PhoneCall size={20}/>}
          text="Live Calls"
          active={activeMenu==="live"}
          onClick={()=>setActiveMenu("live")}
        />

        <Menu
          icon={<CalendarDays size={20}/>}
          text="My Bookings"
          active={activeMenu==="bookings"}
          onClick={()=>setActiveMenu("bookings")}
        />

        <Menu
          icon={<User size={20}/>}
          text="Profile"
          active={activeMenu==="profile"}
          onClick={()=>setActiveMenu("profile")}
        />

        <Menu
          icon={<LogOut size={20}/>}
          text="Logout"
          onClick={()=>{
            localStorage.removeItem("agent");
            window.location.reload();
          }}
        />

      </div>

      {/* Main */}

      <div
        style={{
          flex:1,
          padding:"35px",
        }}
      >
        {renderContent()}
      </div>

    </div>
  );
}

function Menu({
  icon,
  text,
  active,
  onClick
}){

  return(

    <div
      onClick={onClick}
      style={{
        display:"flex",
        alignItems:"center",
        gap:"12px",
        padding:"14px",
        marginBottom:"10px",
        borderRadius:"10px",
        cursor:"pointer",
        background:active?"#2563eb":"transparent",
        color:active?"#fff":"#444",
        fontWeight:600,
      }}
    >

      {icon}

      {text}

    </div>

  );

}