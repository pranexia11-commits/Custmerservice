import React, { useState, useContext } from "react";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function AgentLogin() {
  const { setCurrentView } = useContext(AppContext);

  const [agentId, setAgentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy Credentials
    if (agentId === "AGT001" && password === "agent123") {
      localStorage.setItem(
        "agent",
        JSON.stringify({
          id: "AGT001",
          name: "Rahul Kumar",
          phone: "+91 9876543210",
          email: "rahul@superherooo.com",
        })
      );

      setCurrentView("agent-dashboard");
    } else {
      setError("Invalid Agent ID or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 15px 40px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <ShieldCheck
            size={55}
            color="#2563eb"
          />

          <h2 style={{ marginTop: "10px" }}>
            Agent Login
          </h2>

          <p style={{ color: "#666" }}>
            Login to Agent Dashboard
          </p>
        </div>

        {/* Agent ID */}

        <label
          style={{
            fontWeight: 600,
            marginBottom: "8px",
            display: "block",
          }}
        >
          Agent ID
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "18px",
          }}
        >
          <User size={18} />

          <input
            type="text"
            placeholder="Enter Agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              marginLeft: "10px",
            }}
          />
        </div>

        {/* Password */}

        <label
          style={{
            fontWeight: 600,
            marginBottom: "8px",
            display: "block",
          }}
        >
          Password
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <Lock size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              marginLeft: "10px",
            }}
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <div
          style={{
            marginTop: "25px",
            background: "#eef4ff",
            padding: "15px",
            borderRadius: "10px",
            fontSize: "14px",
          }}
        >
          <strong>Dummy Credentials</strong>

          <br />
          <br />

          Agent ID : <b>AGT001</b>

          <br />

          Password : <b>agent123</b>
        </div>
      </form>
    </div>
  );
}