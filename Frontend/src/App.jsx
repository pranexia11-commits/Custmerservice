import React, { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import Layout from "./components/Layout";
import AudioPlayer from "./components/AudioPlayer";

// Admin Pages
import Login from "./pages/Login";
import AdminAuth from "./pages/AdminAuth";
import CustomerSupportAuth from "./pages/CustomerSupportAuth";
import Dashboard from "./pages/Dashboard";
import IncomingCall from "./pages/IncomingCall";
import CallHistory from "./pages/CallHistory";
import CRM from "./pages/CRM";
import BookingScreen from "./pages/BookingScreen";
import MediatorAssignment from "./pages/MediatorAssignment";
import TicketModule from "./pages/TicketModule";
import LiveCallMonitoring from "./pages/LiveCallMonitoring";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import CustomerSOS from "./pages/CustomerSOS";

// ⭐ NEW Agent Pages
import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";

// Mock Pages
import {
  OutgoingCallsView,
  WorkersView,
  WhatsAppView,
  SMSView,
  EmailView,
  AgentsView
} from "./pages/MockChannels";

function AppContent() {
  const { currentView } = useContext(AppContext);

  const renderView = () => {
    switch (currentView) {

      // Login Pages
      case "login":
        return <Login />;
      case "dashboard":
        return <Dashboard />;

      case "agent-dashboard":
        return <AgentDashboard />;

      // Calls
      case "live-calls":
        return <LiveCallMonitoring />;

      case "incoming-calls":
        return <IncomingCall />;

      case "outgoing-calls":
        return <OutgoingCallsView />;

      case "call-history":
        return <CallHistory />;

      // CRM
      case "customers":
        return <CRM />;

      // Bookings
      case "bookings":
        return <BookingScreen />;

      case "mediators":
        return <MediatorAssignment />;

      case "workers":
        return <WorkersView />;

      // Tickets
      case "tickets":
        return <TicketModule />;

      // Channels
      case "whatsapp":
        return <WhatsAppView />;

      case "sms":
        return <SMSView />;

      case "email":
        return <EmailView />;

      // Reports
      case "reports":
        return <Reports />;

      case "agents":
        return <AgentsView />;

      // Settings
      case "settings":
        return <Settings />;

      // SOS
      case "customer-sos":
        return <CustomerSOS />;

      default:
        return <Dashboard />;
    }
  };


  return (
    <Layout>
      {renderView()}
      <AudioPlayer />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}