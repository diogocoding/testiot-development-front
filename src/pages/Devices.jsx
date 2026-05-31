import { useState } from "react";
import { mockDevices } from "../data/mock";
import { PageHeader, Btn, Modal, Input } from "../components/UI";

function DeviceCard({ device }) {
  const isOnline = device.status === "online";
  return (
    <div style={{
      background: "#0d1220",
      border: `1px solid ${isOnline ? "#1a2540" : "rgba(255,85,102,0.2)"}`,
      borderRadius: 14, padding: "22px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: isOnline ? "linear-gradient(90deg,#00c8a0,transparent)" : "linear-gradient(90deg,#ff5566,transparent)",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: isOnline ? "rgba(0,200,160,0.1)" : "rgba(255,85,102,0.08)",
            border: `1px solid ${isOnline ? "rgba(0,200,160,0.25)" : "rgba(255,85,102,0.2)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>◇</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f4" }}>{device.name}</div>
            <div style={{ fontSize: 10, color: "#4a6080", marginTop: 2 }}>{device.location}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: isOnline ? "#00c8a0" : "#ff5566",
            boxShadow: isOnline ? "0 0 8px #00c8a0" : "none",
            animation: isOnline ? "pulseD 2s infinite" : "none",
          }} />
          <span style={{ fontSize: 10, color: isOnline ? "#00c8a0" : "#ff5566", letterSpacing: "0.1em" }}>
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { label: "ID", val: device.uid },
          { label: "IP LOCAL", val: device.ip },
          { label: "ÚLTIMO PING", val: device.lastPing },
          { label: "ACESSOS HOJE", val: device.accesses.toString() },
        ].map(item => (
          <div key={item.label} style={{ background: "#080c14", borderRadius: 8, padding: "10px 12px", border: "1px solid #111927" }}>
            <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: "#8899b0", letterSpacing: "0.04em" }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Btn small variant={isOnline ? "primary" : "ghost"} onClick={() => {}}>
          {isOnline ? "◈ Ver logs" : "⟳ Reconectar"}
        </Btn>
        <Btn small variant="ghost" onClick={() => {}}>Configurar</Btn>
      </div>
      <style>{`@keyframes pulseD{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

export default function Devices() {
  const [devices] = useState(mockDevices);
  const [showModal, setShowModal] = useState(false);
  const [newDev, setNewDev] = useState({ name: "", location: "", ip: "" });

  const online = devices.filter(d => d.status === "online").length;

  return (
    <div>
      <PageHeader title="Dispositivos" sub={`${online} online · ${devices.length - online} offline`}>
        <Btn onClick={() => setShowModal(true)}>+ Adicionar ESP32</Btn>
      </PageHeader>

      <div style={{ padding: "24px 32px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "TOTAL DE DISPOSITIVOS", val: devices.length, color: "#e2e8f4" },
            { label: "ONLINE", val: online, color: "#00c8a0" },
            { label: "OFFLINE", val: devices.length - online, color: "#ff5566" },
          ].map(s => (
            <div key={s.label} style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Info AWS */}
        <div style={{
          background: "rgba(79,142,247,0.06)", border: "1px solid rgba(79,142,247,0.2)",
          borderRadius: 12, padding: "16px 20px", marginBottom: 24,
          display: "flex", gap: 14, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 18 }}>☁</span>
          <div>
            <div style={{ fontSize: 12, color: "#4f8ef7", fontWeight: 600, marginBottom: 4 }}>Endpoint AWS ativo</div>
            <div style={{ fontSize: 11, color: "#6a82a0", lineHeight: 1.7 }}>
              Os ESP32 se comunicam com a API hospedada na AWS via HTTP POST. O endpoint público permite que os dispositivos operem de qualquer rede com acesso à internet.
            </div>
            <div style={{ fontFamily: "inherit", fontSize: 11, color: "#4f8ef7", marginTop: 8, background: "#080c14", display: "inline-block", padding: "4px 12px", borderRadius: 6, border: "1px solid #1a2540", letterSpacing: "0.04em" }}>
              https://api.access-control.senac.br/v1/validate
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {devices.map(d => <DeviceCard key={d.id} device={d} />)}
        </div>
      </div>

      {showModal && (
        <Modal title="Adicionar Dispositivo ESP32" onClose={() => setShowModal(false)}>
          <Input label="NOME DO PONTO DE ACESSO" value={newDev.name} onChange={v => setNewDev(n => ({ ...n, name: v }))} placeholder="Ex: Sala de Reuniões" />
          <Input label="LOCALIZAÇÃO" value={newDev.location} onChange={v => setNewDev(n => ({ ...n, location: v }))} placeholder="Ex: 3º Andar — Sala 301" />
          <Input label="IP LOCAL (OPCIONAL)" value={newDev.ip} onChange={v => setNewDev(n => ({ ...n, ip: v }))} placeholder="Ex: 192.168.1.104" mono />
          <div style={{ fontSize: 11, color: "#4a6080", lineHeight: 1.7, marginBottom: 16 }}>
            Após adicionar, grave o firmware no ESP32 com o ID gerado para que ele se registre automaticamente na API.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={() => setShowModal(false)}>Adicionar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
