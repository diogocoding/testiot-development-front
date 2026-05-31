import { useState } from "react";
import { mockLogs } from "../data/mock";
import { PageHeader, StatusBadge, Table, Tr, Td, Btn } from "../components/UI";

const FILTERS = ["TODOS", "LIBERADO", "NEGADO", "BLOQUEADO"];

export default function AccessLog() {
  const [filter, setFilter] = useState("TODOS");
  const [search, setSearch] = useState("");

  const filtered = mockLogs.filter(l => {
    const matchFilter = filter === "TODOS" || {
      LIBERADO: "granted", NEGADO: "denied", BLOQUEADO: "blocked"
    }[filter] === l.status;
    const q = search.toLowerCase();
    const matchSearch = !q || l.user.toLowerCase().includes(q) || l.uid.toLowerCase().includes(q) || l.device.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <PageHeader title="Registro de Acessos" sub={`${filtered.length} registros encontrados`}>
        <Btn variant="ghost" onClick={() => {}}>⬇ Exportar</Btn>
      </PageHeader>

      <div style={{ padding: "24px 32px" }}>
        {/* Filtros */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: "#0d1220", border: "1px solid #1a2540", borderRadius: 8, overflow: "hidden" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "8px 14px", fontSize: 10, letterSpacing: "0.1em",
                background: filter === f ? "rgba(0,200,160,0.15)" : "transparent",
                color: filter === f ? "#00c8a0" : "#4a6080",
                border: "none", cursor: "pointer", fontFamily: "inherit",
                borderRight: "1px solid #1a2540",
                transition: "all 0.15s",
              }}>{f}</button>
            ))}
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por usuário, UID ou dispositivo..."
            style={{
              flex: 1, minWidth: 200,
              background: "#0d1220", border: "1px solid #1a2540",
              borderRadius: 8, padding: "8px 14px", color: "#e2e8f4",
              fontFamily: "inherit", fontSize: 12, outline: "none",
            }}
          />
        </div>

        {/* Tabela */}
        <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, overflow: "hidden" }}>
          <Table headers={["HORÁRIO", "DATA", "USUÁRIO", "UID DO CARTÃO", "DISPOSITIVO", "STATUS"]}>
            {filtered.map(log => (
              <Tr key={log.id} highlight={log.status === "granted"}>
                <Td mono muted>{log.time}</Td>
                <Td mono muted>{log.date}</Td>
                <Td>{log.user === "Desconhecido"
                  ? <span style={{ color: "#4a6080", fontStyle: "italic" }}>Desconhecido</span>
                  : log.user}
                </Td>
                <Td mono>
                  <span style={{
                    fontFamily: "inherit", fontSize: 11,
                    background: "#080c14", padding: "2px 8px", borderRadius: 4,
                    border: "1px solid #1a2540", letterSpacing: "0.05em",
                    color: "#6a82a0",
                  }}>{log.uid}</span>
                </Td>
                <Td muted>{log.device}</Td>
                <Td><StatusBadge status={log.status} /></Td>
              </Tr>
            ))}
          </Table>
          {filtered.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "#4a6080", fontSize: 12 }}>
              Nenhum registro encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
