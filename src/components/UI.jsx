/* ── StatusBadge ── */
export function StatusBadge({ status }) {
  const map = {
    granted: { label: "LIBERADO", color: "#00c8a0", bg: "rgba(0,200,160,0.1)", shadow: "#00c8a0" },
    denied:  { label: "NEGADO",   color: "#ff5566", bg: "rgba(255,85,102,0.1)", shadow: "#ff5566" },
    blocked: { label: "BLOQUEADO",color: "#f5a623", bg: "rgba(245,166,35,0.1)", shadow: "#f5a623" },
  };
  const s = map[status] || map.denied;
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
      color: s.color, background: s.bg,
      border: `1px solid ${s.color}33`,
      borderRadius: 4, padding: "3px 8px",
    }}>{s.label}</span>
  );
}

/* ── StatCard ── */
export function StatCard({ label, value, sub, accent = "#00c8a0", icon }) {
  return (
    <div style={{
      background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12,
      padding: "20px 22px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accent}, transparent)`,
      }} />
      <div style={{ fontSize: 20, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#e2e8f4", letterSpacing: "0.06em" }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: "#4a6080", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ── PageHeader ── */
export function PageHeader({ title, sub, children }) {
  return (
    <div style={{
      padding: "28px 32px 20px",
      borderBottom: "1px solid #1a2540",
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      background: "rgba(13,18,32,0.6)", backdropFilter: "blur(8px)",
      position: "sticky", top: 0, zIndex: 10,
      flexWrap: "wrap", gap: 12,
    }}
      className="page-header"
    >
      <div style={{ paddingLeft: "var(--header-left-pad, 0px)" }}>
        <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.15em", marginBottom: 4 }}>SISTEMA DE CONTROLE DE ACESSO</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f4", letterSpacing: "-0.01em", margin: 0 }}>{title}</h1>
        {sub && <p style={{ fontSize: 12, color: "#6a82a0", marginTop: 4 }}>{sub}</p>}
      </div>
      {children && <div style={{ display: "flex", gap: 10 }}>{children}</div>}
      <style>{`
        @media (max-width: 768px) {
          .page-header { padding: 20px 20px 16px !important; }
          .page-header > div:first-child { --header-left-pad: 44px; }
        }
      `}</style>
    </div>
  );
}

/* ── Btn ── */
export function Btn({ children, onClick, variant = "primary", small }) {
  const variants = {
    primary: { bg: "rgba(0,200,160,0.15)", color: "#00c8a0", border: "1px solid rgba(0,200,160,0.4)" },
    danger:  { bg: "rgba(255,85,102,0.12)", color: "#ff5566", border: "1px solid rgba(255,85,102,0.3)" },
    ghost:   { bg: "transparent", color: "#6a82a0", border: "1px solid #1a2540" },
  };
  const v = variants[variant];
  return (
    <button onClick={onClick} style={{
      ...v, borderRadius: 7, padding: small ? "5px 12px" : "8px 16px",
      fontSize: small ? 10 : 11, letterSpacing: "0.08em", cursor: "pointer",
      fontFamily: "inherit", fontWeight: 600, transition: "all 0.15s",
    }}>{children}</button>
  );
}

/* ── Table ── */
export function Table({ headers, children }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{
                padding: "10px 16px", textAlign: "left",
                fontSize: 9, letterSpacing: "0.12em", color: "#4a6080",
                borderBottom: "1px solid #1a2540", whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Tr({ children, highlight }) {
  return (
    <tr style={{
      borderBottom: "1px solid #111927",
      background: highlight ? "rgba(0,200,160,0.04)" : "transparent",
      transition: "background 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      onMouseLeave={e => e.currentTarget.style.background = highlight ? "rgba(0,200,160,0.04)" : "transparent"}
    >{children}</tr>
  );
}

export function Td({ children, mono, muted }) {
  return (
    <td style={{
      padding: "12px 16px",
      color: muted ? "#4a6080" : "#c8d4e4",
      fontFamily: mono ? "inherit" : "inherit",
      fontSize: mono ? 11 : 12,
      letterSpacing: mono ? "0.05em" : "normal",
      whiteSpace: "nowrap",
    }}>{children}</td>
  );
}

/* ── Toggle ── */
export function Toggle({ active, onChange }) {
  return (
    <div onClick={() => onChange(!active)} style={{
      width: 36, height: 20, borderRadius: 10,
      background: active ? "rgba(0,200,160,0.3)" : "#1a2540",
      border: `1px solid ${active ? "#00c8a0" : "#2d3d55"}`,
      position: "relative", cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 2, left: active ? 17 : 2,
        width: 14, height: 14, borderRadius: "50%",
        background: active ? "#00c8a0" : "#4a6080",
        transition: "all 0.2s",
        boxShadow: active ? "0 0 6px #00c8a0" : "none",
      }} />
    </div>
  );
}

/* ── Modal ── */
export function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(8,12,20,0.85)", display: "flex",
      alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#0d1220", border: "1px solid #1a2540",
        borderRadius: 14, padding: "28px", width: 460, maxWidth: "95vw",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, color: "#e2e8f4", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#4a6080", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Input ── */
export function Input({ label, value, onChange, placeholder, mono }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 6 }}>{label}</div>}
      <input
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", background: "#080c14", border: "1px solid #1a2540",
          borderRadius: 8, padding: "10px 14px", color: "#e2e8f4",
          fontFamily: mono ? "inherit" : "inherit", fontSize: 12,
          outline: "none", boxSizing: "border-box",
          letterSpacing: mono ? "0.08em" : "normal",
        }}
      />
    </div>
  );
}
