import { useState } from "react";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "log", label: "Registro", icon: "◈" },
  { id: "users", label: "Usuários", icon: "◎" },
  { id: "devices", label: "Dispositivos", icon: "◇" },
];

export default function Sidebar({ current, onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <aside style={{
      width: 220,
      background: "#0d1220",
      borderRight: "1px solid #1a2540",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      position: "relative",
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 20px 24px", borderBottom: "1px solid #1a2540" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #00c8a0, #0087e0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, flexShrink: 0,
          }}>◈</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#e2e8f4" }}>ACCESS</div>
            <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.12em", marginTop: 1 }}>CONTROL SYS</div>
          </div>
        </div>
      </div>

      {/* Status da AWS */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a2540" }}>
        <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>INFRA STATUS</div>
        {[
          { label: "AWS API", ok: true },
          { label: "Database", ok: true },
          { label: "ESP32-001", ok: true },
          { label: "ESP32-003", ok: false },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: "#6a82a0" }}>{s.label}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: s.ok ? "#00c8a0" : "#ff5566" }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: s.ok ? "#00c8a0" : "#ff5566",
                boxShadow: s.ok ? "0 0 6px #00c8a0" : "0 0 6px #ff5566",
                animation: s.ok ? "blink 2s infinite" : "none",
              }} />
              {s.ok ? "online" : "offline"}
            </span>
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 10, paddingLeft: 8 }}>NAVEGAÇÃO</div>
        {NAV.map(item => {
          const isActive = current === item.id;
          const isHov = hovered === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                background: isActive ? "rgba(0,200,160,0.1)" : isHov ? "rgba(255,255,255,0.04)" : "transparent",
                color: isActive ? "#00c8a0" : "#8899b0",
                fontSize: 12, letterSpacing: "0.05em", marginBottom: 2,
                transition: "all 0.15s",
                outline: isActive ? "1px solid rgba(0,200,160,0.2)" : "none",
              }}
            >
              <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #1a2540" }}>
        <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.08em" }}>SENAC PERNAMBUCO</div>
        <div style={{ fontSize: 9, color: "#2d3d55", marginTop: 2 }}>Sprint IoT · 2025</div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </aside>
  );
}
