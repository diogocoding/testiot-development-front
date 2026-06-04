import { useState, useEffect } from "react";
import { PageHeader, Btn, Modal, Input } from "../components/UI";

function DeviceCard({ device, onEdit, onDelete }) {
  const isOnline = device.isOnline;
  
  // Formata a data do último ping se o C# tiver devolvido um valor, caso contrário exibe "Nunca"
  const lastPingFormated = device.lastPing 
    ? new Date(device.lastPing).toLocaleString('pt-BR') 
    : "Nunca";

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
          { label: "ID DO HARDWARE", val: device.token },
          { label: "IP LOCAL", val: device.ipAddress || "-" },
          { label: "ÚLTIMO PING", val: lastPingFormated },
        ].map(item => (
          <div key={item.label} style={{ background: "#080c14", borderRadius: 8, padding: "10px 12px", border: "1px solid #111927" }}>
            <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: "#8899b0", letterSpacing: "0.04em" }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Btn small variant="ghost" onClick={() => onEdit(device)}>Editar</Btn>
        <Btn small variant="danger" onClick={() => onDelete(device.id)}>✕ Excluir</Btn>
      </div>
      <style>{`@keyframes pulseD{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // O estado agora reflete os mesmos nomes do C# (name, location, token, ipAddress)
  const [newDev, setNewDev] = useState({ name: "", location: "", token: "", ipAddress: "" });

  // 1. Busca inicial na API
  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    fetch(`${apiURL}/api/aparelhos`)
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error("Erro ao buscar aparelhos:", err));
  }, []);

  // 2. Exclusão
  const deleteDevice = async (id) => {
    if (!window.confirm("Deseja realmente remover esta placa do sistema?")) return;
    
    const apiURL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${apiURL}/api/aparelhos/${id}`, { method: 'DELETE' });
      if (res.ok) setDevices(ds => ds.filter(d => d.id !== id));
    } catch (err) {
      console.error("Falha ao excluir aparelho:", err);
    }
  };

  // 3. Controle do Modal
  const openAddModal = () => {
    setEditingId(null);
    setNewDev({ name: "", location: "", token: "", ipAddress: "" });
    setShowModal(true);
  };

  const openEditModal = (device) => {
    setEditingId(device.id);
    setNewDev({ 
      name: device.name, 
      location: device.location, 
      token: device.token, 
      ipAddress: device.ipAddress || "" 
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  // 4. Salvar (Inteligência para POST ou PUT)
  const saveDevice = async () => {
    if (!newDev.name || !newDev.token) return;

    const apiURL = import.meta.env.VITE_API_URL;

    try {
      if (editingId) {
        const res = await fetch(`${apiURL}/api/aparelhos/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDev)
        });

        if (res.ok) {
          const atualizado = await res.json();
          setDevices(ds => ds.map(d => d.id === editingId ? atualizado : d));
          closeModal();
        }
      } else {
        const res = await fetch(`${apiURL}/api/aparelhos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDev)
        });

        if (res.ok) {
          const criado = await res.json();
          setDevices(ds => [...ds, criado]);
          closeModal();
        }
      }
    } catch (err) {
      console.error("Erro ao salvar dispositivo:", err);
    }
  };

  const online = devices.filter(d => d.isOnline).length;

  return (
    <div>
      <PageHeader title="Dispositivos" sub={`${online} online · ${devices.length - online} offline`}>
        <Btn onClick={openAddModal}>+ Adicionar ESP32</Btn>
      </PageHeader>

      <div style={{ padding: "24px clamp(16px,4vw,32px)" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
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
          {devices.map(d => <DeviceCard key={d.id} device={d} onEdit={openEditModal} onDelete={deleteDevice} />)}
        </div>
      </div>

      {showModal && (
        <Modal title={editingId ? "Editar ESP32" : "Adicionar Dispositivo ESP32"} onClose={closeModal}>
          <Input label="NOME DO PONTO DE ACESSO" value={newDev.name} onChange={v => setNewDev(n => ({ ...n, name: v }))} placeholder="Ex: Entrada Principal" />
          <Input label="TOKEN/ID DO HARDWARE" value={newDev.token} onChange={v => setNewDev(n => ({ ...n, token: v }))} placeholder="Ex: ESP32-001" mono />
          <Input label="LOCALIZAÇÃO" value={newDev.location} onChange={v => setNewDev(n => ({ ...n, location: v }))} placeholder="Ex: Térreo — Portão A" />
          <Input label="IP LOCAL (OPCIONAL)" value={newDev.ipAddress} onChange={v => setNewDev(n => ({ ...n, ipAddress: v }))} placeholder="Ex: 192.168.1.104" mono />
          <div style={{ fontSize: 11, color: "#4a6080", lineHeight: 1.7, marginBottom: 16, marginTop: 8 }}>
            💡 Certifique-se de configurar a placa com o mesmo <strong>TOKEN/ID</strong> inserido acima para que o backend a reconheça na rede.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Btn variant="ghost" onClick={closeModal}>Cancelar</Btn>
            <Btn onClick={saveDevice}>{editingId ? "Salvar Alterações" : "Adicionar"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}