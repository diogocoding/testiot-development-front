import { useState, useEffect } from "react";
import { PageHeader } from "../components/UI";

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    totalUsers: 0, activeUsers: 0, 
    totalDevices: 0, onlineDevices: 0,
    totalLogs: 0, authorizedToday: 0 
  });

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    
    // Busca tudo ao mesmo tempo
    Promise.all([
      fetch(`${apiURL}/api/users`).then(r => r.json()),
      fetch(`${apiURL}/api/aparelhos`).then(r => r.json()),
      fetch(`${apiURL}/api/access/logs`).then(r => r.json())
    ]).then(([users, devices, logs]) => {
      
      // Conta quantos logs foram autorizados hoje
      const hoje = new Date().toDateString();
      const authToday = logs.filter(l => l.authorized && new Date(l.timestamp).toDateString() === hoje).length;

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter(u => u.active).length,
        totalDevices: devices.length,
        onlineDevices: devices.filter(d => d.isOnline).length,
        totalLogs: logs.length,
        authorizedToday: authToday
      });
    }).catch(err => console.error("Erro no Dashboard:", err));
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" sub="Visão geral do sistema em tempo real" />

      <div style={{ padding: "24px clamp(16px,4vw,32px)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {/* Card Usuários */}
        <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, padding: "24px" }}>
          <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 12 }}>USUÁRIOS CADASTRADOS</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#e2e8f4", marginBottom: 8 }}>{stats.totalUsers}</div>
          <div style={{ fontSize: 12, color: "#00c8a0" }}>↑ {stats.activeUsers} com acesso liberado</div>
        </div>

        {/* Card Dispositivos */}
        <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, padding: "24px" }}>
          <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 12 }}>DISPOSITIVOS ESP32</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#e2e8f4", marginBottom: 8 }}>{stats.totalDevices}</div>
          <div style={{ fontSize: 12, color: stats.onlineDevices > 0 ? "#00c8a0" : "#ff5566" }}>
            {stats.onlineDevices > 0 ? `● ${stats.onlineDevices} online na rede` : "⊗ Nenhum dispositivo online"}
          </div>
        </div>

        {/* Card Acessos Hoje */}
        <div style={{ background: "rgba(79,142,247,0.05)", border: "1px solid rgba(79,142,247,0.2)", borderRadius: 12, padding: "24px" }}>
          <div style={{ fontSize: 10, color: "#4f8ef7", letterSpacing: "0.1em", marginBottom: 12 }}>ACESSOS LIBERADOS HOJE</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#4f8ef7", marginBottom: 8 }}>{stats.authorizedToday}</div>
          <div style={{ fontSize: 12, color: "#6a82a0" }}>De um total de {stats.totalLogs} registros históricos</div>
        </div>
      </div>
    </div>
  );
}