import { useState, useEffect } from 'react';
import { mockUsers } from "../data/mock";
import { PageHeader, StatusBadge, Toggle, Btn, Modal, Input, Table, Tr, Td } from "../components/UI";

function UserCard({ user, onToggle, onDelete }) {
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
          <span style={{ color: "#6a82a0", fontWeight: 600 }}>{user.accesses}</span> acessos · {user.lastSeen}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn small variant="ghost" onClick={() => {}}>Editar</Btn>
          <Btn small variant="danger" onClick={() => onDelete(user.id)}>Remover</Btn>
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  // 1. O estado dos usuários (que você já tinha arrumado)
  const [users, setUsers] = useState([]);
  
  // 2. AS VARIÁVEIS QUE ESTAVAM FALTANDO (Para a tela não quebrar)
  const [view, setView] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", uid: "", role: "" });

  // 3. A chamada da API
  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    fetch(`${apiURL}/api/users`)
      .then(resposta => resposta.json())
      .then(dados => setUsers(dados))
      .catch(erro => console.error("Erro na API:", erro));
  }, []);

  // 4. AS FUNÇÕES QUE ESTAVAM FALTANDO (Para os botões funcionarem)
  const toggleUser = (id) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const deleteUser = (id) => {
    setUsers(us => us.filter(u => u.id !== id));
  };

  const addUser = async () => {
    // 1. Validação simples para não enviar vazio
    if (!newUser.name || !newUser.uid) return;

    // 2. Pega a URL do seu .env
    const apiURL = import.meta.env.VITE_API_URL;

    try {
      // 3. Faz a chamada POST para o C#
      const resposta = await fetch(`${apiURL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Avisa o C# que estamos mandando um JSON
        },
        body: JSON.stringify({
          name: newUser.name,
          uid: newUser.uid,
          role: newUser.role
        })
      });

      // 4. Se o C# respondeu com sucesso (201 Created)
      if (resposta.ok) {
        const usuarioCriado = await resposta.json();
        
        // Adiciona o novo usuário (já com o ID gerado pelo backend) na lista da tela
        setUsers(us => [...us, usuarioCriado]);
        
        // Fecha o modal e limpa os campos
        setShowModal(false);
        setNewUser({ name: "", uid: "", role: "" });
      } else {
        console.error("Erro ao cadastrar:", await resposta.text());
      }
    } catch (erro) {
      console.error("Falha na comunicação com a API:", erro);
    }
  };
  const active = users.filter(u => u.active).length;

  return (
    <div>
      <PageHeader title="Usuários" sub={`${active} ativos · ${users.length - active} bloqueados`}>
        <div style={{ display: "flex", background: "#0d1220", border: "1px solid #1a2540", borderRadius: 7, overflow: "hidden" }}>
          {["grid", "table"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "7px 12px", fontSize: 14, border: "none", cursor: "pointer",
              fontFamily: "inherit", background: view === v ? "rgba(0,200,160,0.15)" : "transparent",
              color: view === v ? "#00c8a0" : "#4a6080", transition: "all 0.15s",
            }}>{v === "grid" ? "⊞" : "☰"}</button>
          ))}
        </div>
        <Btn onClick={() => setShowModal(true)}>+ Cadastrar Cartão</Btn>
      </PageHeader>

      <div style={{ padding: "24px 32px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "TOTAL CADASTRADOS", val: users.length, color: "#e2e8f4" },
            { label: "ACESSO ATIVO", val: active, color: "#00c8a0" },
            { label: "BLOQUEADOS", val: users.length - active, color: "#ff5566" },
          ].map(s => (
            <div key={s.label} style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 9, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {users.map(u => <UserCard key={u.id} user={u} onToggle={toggleUser} onDelete={deleteUser} />)}
          </div>
        ) : (
          <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, overflow: "hidden" }}>
            <Table headers={["NOME", "UID DO CARTÃO", "CARGO", "ACESSOS", "ÚLTIMO ACESSO", "STATUS", "AÇÕES"]}>
              {users.map(u => (
                <Tr key={u.id}>
                  <Td>{u.name}</Td>
                  <Td mono>
                    <span style={{ fontSize: 10, background: "#080c14", padding: "2px 8px", borderRadius: 4, border: "1px solid #1a2540", color: "#6a82a0" }}>{u.uid}</span>
                  </Td>
                  <Td muted>{u.role}</Td>
                  <Td><span style={{ color: "#00c8a0", fontWeight: 600 }}>{u.accesses}</span></Td>
                  <Td muted>{u.lastSeen}</Td>
                  <Td><Toggle active={u.active} onChange={() => toggleUser(u.id)} /></Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn small variant="ghost" onClick={() => {}}>Editar</Btn>
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
        <Modal title="Cadastrar Novo Cartão" onClose={() => setShowModal(false)}>
          <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 20, lineHeight: 1.7, background: "rgba(0,200,160,0.06)", border: "1px solid rgba(0,200,160,0.15)", borderRadius: 8, padding: "12px" }}>
            💡 Aproxime o cartão do leitor ESP32 para capturar o UID automaticamente, ou insira manualmente abaixo.
          </div>
          <Input label="NOME COMPLETO" value={newUser.name} onChange={v => setNewUser(n => ({ ...n, name: v }))} placeholder="Ex: Diogo Nascimento" />
          <Input label="UID DO CARTÃO" value={newUser.uid} onChange={v => setNewUser(n => ({ ...n, uid: v }))} placeholder="Ex: A1 B2 C3 D4" mono />
          <Input label="CARGO / FUNÇÃO" value={newUser.role} onChange={v => setNewUser(n => ({ ...n, role: v }))} placeholder="Ex: Desenvolvedor" />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Btn>
            <Btn onClick={addUser}>Cadastrar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
