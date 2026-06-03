import { useState, useEffect } from 'react';
import { PageHeader, StatusBadge, Toggle, Btn, Modal, Input, Table, Tr, Td } from "../components/UI";

// Adicionamos a propriedade "onEdit" no UserCard
function UserCard({ user, onToggle, onDelete, onEdit }) {
  return (
    <div style={{
      background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12,
      padding: "20px", transition: "border-color 0.2s",
      borderColor: user.active ? "#1a2540" : "rgba(255,85,102,0.2)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: user.active ? "rgba(0,200,160,0.1)" : "rgba(255,85,102,0.08)",
            border: `1px solid ${user.active ? "rgba(0,200,160,0.2)" : "rgba(255,85,102,0.2)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: user.active ? "#00c8a0" : "#ff5566",
          }}>◎</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f4" }}>{user.name}</div>
            <div style={{ fontSize: 10, color: "#4a6080", marginTop: 2, letterSpacing: "0.05em" }}>{user.role}</div>
          </div>
        </div>
        <Toggle active={user.active} onChange={() => onToggle(user.id)} />
      </div>

      <div style={{
        background: "#080c14", borderRadius: 8, padding: "10px 12px",
        border: "1px solid #111927", marginBottom: 14,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 10, color: "#4a6080" }}>UID</span>
        <span style={{ fontSize: 11, color: "#6a82a0", letterSpacing: "0.06em", flex: 1 }}>{user.uid}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#4a6080" }}>
          <span style={{ color: "#6a82a0", fontWeight: 600 }}>{user.accesses}</span> acessos
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {/* Conectado ao botão Editar */}
          <Btn small variant="ghost" onClick={() => onEdit(user)}>Editar</Btn>
          <Btn small variant="danger" onClick={() => onDelete(user.id)}>✕</Btn>
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", uid: "", role: "" });
  
  // NOVO: Estado para saber se estamos Editando ou Criando
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    fetch(`${apiURL}/api/users`)
      .then(resposta => resposta.json())
      .then(dados => setUsers(dados))
      .catch(erro => console.error("Erro na API:", erro));
  }, []);

  // --- NOVA LÓGICA DE EXCLUIR NA NUVEM ---
  const deleteUser = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário definitivamente?")) return;
    
    const apiURL = import.meta.env.VITE_API_URL;
    try {
      const resposta = await fetch(`${apiURL}/api/users/${id}`, { method: 'DELETE' });
      if (resposta.ok) {
        setUsers(us => us.filter(u => u.id !== id));
      }
    } catch (erro) {
      console.error("Falha ao excluir:", erro);
    }
  };

  // --- NOVA LÓGICA DE TOGGLE NA NUVEM ---
  const toggleUser = async (id) => {
    const usuarioAlvo = users.find(u => u.id === id);
    if (!usuarioAlvo) return;

    const usuarioAtualizado = { ...usuarioAlvo, active: !usuarioAlvo.active };
    
    // Atualiza a tela primeiro (otimista) para não parecer que está travado
    setUsers(us => us.map(u => u.id === id ? usuarioAtualizado : u));

    const apiURL = import.meta.env.VITE_API_URL;
    try {
      const resposta = await fetch(`${apiURL}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioAtualizado)
      });
      
      // Se der erro no C#, desfaz a animação da tela
      if (!resposta.ok) setUsers(us => us.map(u => u.id === id ? usuarioAlvo : u));
    } catch (erro) {
      setUsers(us => us.map(u => u.id === id ? usuarioAlvo : u));
      console.error("Falha ao mudar status:", erro);
    }
  };

  // --- LÓGICA DE ABRIR E FECHAR MODAL ---
  const openCadastrarModal = () => {
    setEditingId(null);
    setNewUser({ name: "", uid: "", role: "" });
    setShowModal(true);
  };

  const openEditarModal = (user) => {
    setEditingId(user.id);
    setNewUser({ name: user.name, uid: user.uid, role: user.role });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNewUser({ name: "", uid: "", role: "" });
  };

  // --- LÓGICA UNIFICADA: SALVAR (CRIAR ou EDITAR) ---
  const saveUser = async () => {
    if (!newUser.name || !newUser.uid) return;

    const apiURL = import.meta.env.VITE_API_URL;

    try {
      if (editingId) {
        // MODO: EDITAR (PUT)
        const usuarioExistente = users.find(u => u.id === editingId);
        const resposta = await fetch(`${apiURL}/api/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newUser, active: usuarioExistente.active })
        });

        if (resposta.ok) {
          const atualizado = await resposta.json();
          setUsers(us => us.map(u => u.id === editingId ? atualizado : u));
          closeModal();
        }
      } else {
        // MODO: CADASTRAR (POST)
        const resposta = await fetch(`${apiURL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });

        if (resposta.ok) {
          const criado = await resposta.json();
          setUsers(us => [...us, criado]);
          closeModal();
        }
      }
    } catch (erro) {
      console.error("Falha ao salvar usuário:", erro);
    }
  };

  const activeCount = users.filter(u => u.active).length;

  return (
    <div>
      <PageHeader title="Usuários" sub={`${activeCount} ativos · ${users.length - activeCount} bloqueados`}>
        <div style={{ display: "flex", background: "#0d1220", border: "1px solid #1a2540", borderRadius: 7, overflow: "hidden" }}>
          {["grid", "table"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "7px 12px", fontSize: 14, border: "none", cursor: "pointer",
              fontFamily: "inherit", background: view === v ? "rgba(0,200,160,0.15)" : "transparent",
              color: view === v ? "#00c8a0" : "#4a6080", transition: "all 0.15s",
            }}>{v === "grid" ? "⊞" : "☰"}</button>
          ))}
        </div>
        <Btn onClick={openCadastrarModal}>+ Cadastrar Cartão</Btn>
      </PageHeader>

      <div style={{ padding: "24px 32px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "TOTAL CADASTRADOS", val: users.length, color: "#e2e8f4" },
            { label: "ACESSO ATIVO", val: activeCount, color: "#00c8a0" },
            { label: "BLOQUEADOS", val: users.length - activeCount, color: "#ff5566" },
          ].map(s => (
            <div key={s.label} style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {users.map(u => <UserCard key={u.id} user={u} onToggle={toggleUser} onDelete={deleteUser} onEdit={openEditarModal} />)}
          </div>
        ) : (
          <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, overflow: "hidden" }}>
            <Table headers={["NOME", "UID DO CARTÃO", "CARGO", "ACESSOS", "STATUS", "AÇÕES"]}>
              {users.map(u => (
                <Tr key={u.id}>
                  <Td>{u.name}</Td>
                  <Td mono>
                    <span style={{ fontSize: 10, background: "#080c14", padding: "2px 8px", borderRadius: 4, border: "1px solid #1a2540", color: "#6a82a0" }}>{u.uid}</span>
                  </Td>
                  <Td muted>{u.role}</Td>
                  <Td><span style={{ color: "#00c8a0", fontWeight: 600 }}>{u.accesses}</span></Td>
                  <Td><Toggle active={u.active} onChange={() => toggleUser(u.id)} /></Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn small variant="ghost" onClick={() => openEditarModal(u)}>Editar</Btn>
                      <Btn small variant="danger" onClick={() => deleteUser(u.id)}>✕</Btn>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Table>
          </div>
        )}
      </div>

      {showModal && (
        <Modal title={editingId ? "Editar Usuário" : "Cadastrar Novo Cartão"} onClose={closeModal}>
          <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 20, lineHeight: 1.7, background: "rgba(0,200,160,0.06)", border: "1px solid rgba(0,200,160,0.15)", borderRadius: 8, padding: "12px" }}>
            💡 Aproxime o cartão do leitor ESP32 para capturar o UID automaticamente, ou insira manualmente abaixo.
          </div>
          <Input label="NOME COMPLETO" value={newUser.name} onChange={v => setNewUser(n => ({ ...n, name: v }))} placeholder="Ex: Diogo Nascimento" />
          <Input label="UID DO CARTÃO" value={newUser.uid} onChange={v => setNewUser(n => ({ ...n, uid: v }))} placeholder="Ex: A1 B2 C3 D4" mono />
          <Input label="CARGO / FUNÇÃO" value={newUser.role} onChange={v => setNewUser(n => ({ ...n, role: v }))} placeholder="Ex: Desenvolvedor" />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={closeModal}>Cancelar</Btn>
            <Btn onClick={saveUser}>{editingId ? "Salvar Alterações" : "Cadastrar"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}