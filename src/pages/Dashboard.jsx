import { useState, useEffect } from "react";
import { mockLogs, mockStats, mockDevices } from "../data/mock";
import { StatCard, PageHeader, StatusBadge } from "../components/UI";

function LivePulse() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const events = [
    { uid: "A1 B2 C3 D4", user: "Diogo Nascimento", status: "granted", device: "Entrada Principal" },
    { uid: "FF 3A 91 C0", user: "Carlos Machado", status: "granted", device: "Entrada Principal" },
    { uid: "00 DE AD BE", user: "Desconhecido", status: "denied", device: "Lab IoT" },
    { uid: "C9 04 AA 5E", user: "Maíra Lourenço", status: "granted", device: "Entrada Principal" },
  ];
  const ev = events[tick % events.length];
  const colors = { granted: "#00c8a0", denied: "#ff5566" };

  return (
    <div style={{
      background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12,
      padding: "18px 20px", marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{
          width: 7, height: 7, borderRadius: "50%", background: "#00c8a0",
          boxShadow: "0 0 8px #00c8a0", animation: "pulseLive 1.5s infinite",
        }} />
        <span style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.12em" }}>FEED EM TEMPO REAL</span>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 14px", background: "#080c14", borderRadius: 8,
        border: `1px solid ${colors[ev.status]}33`,
        animation: "fadeSlide 0.4s ease",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: `${colors[ev.status]}15`,
          border: `1px solid ${colors[ev.status]}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>
          {ev.status === "granted" ? "◈" : "✕"}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#e2e8f4", fontWeight: 600 }}>{ev.user}</div>
          <div style={{ fontSize: 10, color: "#4a6080", marginTop: 2 }}>
            UID: <span style={{ color: "#6a82a0" }}>{ev.uid}</span> · {ev.device}
          </div>
        </div>
        <div>
          <StatusBadge status={ev.status} />
          <div style={{ fontSize: 9, color: "#4a6080", textAlign: "right", marginTop: 4 }}>agora</div>
        </div>
      </div>
      <style>{`
        @keyframes pulseLive { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

function MiniChart({ data, color }) {
  const max = Math.max(...data, 1);
  return (
    <svg width="100%" height="48" viewBox={`0 0 ${data.length * 16} 48`} preserveAspectRatio="none">
      {data.map((v, i) => {
        const h = (v / max) * 40;
        return (
          <rect key={i} x={i * 16 + 2} y={48 - h} width={12} height={h}
            rx={3} fill={color} opacity={i === data.length - 1 ? 1 : 0.35 + (i / data.length) * 0.5} />
        );
      })}
    </svg>
  );
}

export default function Dashboard() {
  const recent = mockLogs.slice(0, 6);
  const hourlyGranted = [3, 5, 2, 8, 4, 6, 3, 7, 5, 4, 6, 8];
  const hourlyDenied  = [0, 1, 0, 2, 1, 0, 1, 0, 2, 1, 0, 2];

  return (
    <div>
      <PageHeader title="Dashboard" sub="Visão geral do sistema de acesso" />
      <div style={{ padding: "24px 32px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
          <StatCard icon="◈" label="ACESSOS HOJE" value={mockStats.todayTotal} sub={`${mockStats.todayGranted} liberados · ${mockStats.todayDenied} negados`} accent="#00c8a0" />
          <StatCard icon="◎" label="USUÁRIOS ATIVOS" value={mockStats.activeUsers} sub="de 8 cadastrados" accent="#4f8ef7" />
          <StatCard icon="◇" label="DISPOSITIVOS ON" value={`${mockStats.devicesOnline}/3`} sub="ESP32 conectados" accent="#a78bfa" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Gráfico acessos */}
          <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em" }}>ACESSOS POR HORA</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#00c8a0", marginTop: 4 }}>{mockStats.weekTotal}</div>
                <div style={{ fontSize: 10, color: "#4a6080" }}>esta semana</div>
              </div>
              <span style={{ fontSize: 9, background: "rgba(0,200,160,0.1)", color: "#00c8a0", border: "1px solid rgba(0,200,160,0.2)", borderRadius: 4, padding: "3px 8px", letterSpacing: "0.1em" }}>LIBERADOS</span>
            </div>
            <MiniChart data={hourlyGranted} color="#00c8a0" />
          </div>

          {/* Gráfico negados */}
          <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em" }}>TENTATIVAS NEGADAS</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#ff5566", marginTop: 4 }}>9</div>
                <div style={{ fontSize: 10, color: "#4a6080" }}>esta semana</div>
              </div>
              <span style={{ fontSize: 9, background: "rgba(255,85,102,0.1)", color: "#ff5566", border: "1px solid rgba(255,85,102,0.2)", borderRadius: 4, padding: "3px 8px", letterSpacing: "0.1em" }}>NEGADOS</span>
            </div>
            <MiniChart data={hourlyDenied} color="#ff5566" />
          </div>
        </div>

        {/* Live feed */}
        <LivePulse />

        {/* Dispositivos */}
        <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, padding: "20px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 14 }}>STATUS DOS DISPOSITIVOS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockDevices.map(d => (
              <div key={d.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 14px", background: "#080c14", borderRadius: 8,
                border: "1px solid #111927",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: d.status === "online" ? "#00c8a0" : "#ff5566",
                    boxShadow: d.status === "online" ? "0 0 8px #00c8a0" : "none",
                  }} />
                  <div>
                    <div style={{ fontSize: 12, color: "#e2e8f4", fontWeight: 600 }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: "#4a6080" }}>{d.location}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: d.status === "online" ? "#00c8a0" : "#ff5566", letterSpacing: "0.08em" }}>{d.status.toUpperCase()}</div>
                  <div style={{ fontSize: 10, color: "#4a6080" }}>{d.lastPing}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Últimos acessos */}
        <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a2540" }}>
            <span style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em" }}>ACESSOS RECENTES</span>
          </div>
          {recent.map((log, i) => (
            <div key={log.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: i < recent.length - 1 ? "1px solid #0e1520" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 10, color: "#2d3d55", fontFamily: "inherit" }}>{log.time}</div>
                <div style={{ fontSize: 12, color: "#c8d4e4" }}>{log.user}</div>
                <div style={{ fontSize: 10, color: "#2d3d55" }}>{log.uid}</div>
              </div>
              <StatusBadge status={log.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
