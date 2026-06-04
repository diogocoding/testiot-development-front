export default function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.user.value.trim();
    const pass = e.target.pass.value;
    if (user === "admin" && pass === "senac2025") {
      onLogin();
    } else {
      const err = document.getElementById("login-err");
      err.style.opacity = "1";
      setTimeout(() => { err.style.opacity = "0"; }, 3000);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#080c14",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      padding: "20px",
    }}>
      <div style={{
        width: "100%", maxWidth: 400,
        background: "#0d1220", border: "1px solid #1a2540",
        borderRadius: 16, padding: "36px 32px",
        boxShadow: "0 0 60px rgba(0,200,160,0.06)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, #00c8a0, #0087e0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
          }}>◈</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", color: "#e2e8f4" }}>ACCESS</div>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.14em" }}>CONTROL SYS</div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 24 }}>AUTENTICAÇÃO</div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, color: "#4a6080", letterSpacing: "0.12em", marginBottom: 6 }}>USUÁRIO</label>
            <input
              name="user"
              autoComplete="username"
              style={{
                width: "100%", background: "#080c14", border: "1px solid #1a2540",
                borderRadius: 8, padding: "11px 14px", color: "#e2e8f4",
                fontSize: 12, fontFamily: "inherit", letterSpacing: "0.04em",
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = "#00c8a0"}
              onBlur={e => e.target.style.borderColor = "#1a2540"}
              placeholder="admin"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 9, color: "#4a6080", letterSpacing: "0.12em", marginBottom: 6 }}>SENHA</label>
            <input
              name="pass"
              type="password"
              autoComplete="current-password"
              style={{
                width: "100%", background: "#080c14", border: "1px solid #1a2540",
                borderRadius: 8, padding: "11px 14px", color: "#e2e8f4",
                fontSize: 12, fontFamily: "inherit", letterSpacing: "0.08em",
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = "#00c8a0"}
              onBlur={e => e.target.style.borderColor = "#1a2540"}
              placeholder="••••••••"
            />
          </div>

          <div
            id="login-err"
            style={{
              fontSize: 10, color: "#ff5566", marginBottom: 16,
              opacity: 0, transition: "opacity 0.3s",
              letterSpacing: "0.06em",
            }}
          >
            ✕ Usuário ou senha incorretos
          </div>

          <button type="submit" style={{
            width: "100%", padding: "12px", borderRadius: 8,
            background: "linear-gradient(135deg, #00c8a0, #0087e0)",
            border: "none", color: "#080c14", fontSize: 12, fontWeight: 700,
            fontFamily: "inherit", letterSpacing: "0.08em", cursor: "pointer",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            ENTRAR
          </button>
        </form>

        <div style={{ marginTop: 24, padding: "12px 14px", background: "#080c14", borderRadius: 8, border: "1px solid #111927" }}>
          <div style={{ fontSize: 9, color: "#2d3d55", letterSpacing: "0.06em" }}>SENAC PERNAMBUCO · Sprint IoT · 2025</div>
        </div>
      </div>
    </div>
  );
}
