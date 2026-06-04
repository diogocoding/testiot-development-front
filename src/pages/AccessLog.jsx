import { useState, useEffect } from "react";
import { PageHeader, Table, Tr, Td } from "../components/UI";

export default function AccessLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    // Bate na nova rota do C#
    fetch(`${apiURL}/api/access/logs`)
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error("Erro ao buscar logs:", err));
  }, []);

  return (
    <div>
      <PageHeader title="Registros de Acesso" sub={`Total de ${logs.length} eventos registrados`} />

      <div style={{ padding: "24px clamp(16px,4vw,32px)" }}>
        <div style={{ background: "#0d1220", border: "1px solid #1a2540", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
          <Table headers={["DATA E HORA", "USUÁRIO", "CARTÃO (UID)", "DISPOSITIVO", "STATUS", "MENSAGEM"]}>
            {logs.map(log => {
              const dataFormatada = new Date(log.timestamp).toLocaleString('pt-BR');
              const corStatus = log.authorized ? "#00c8a0" : "#ff5566";

              return (
                <Tr key={log.id}>
                  <Td muted>{dataFormatada}</Td>
                  <Td><strong>{log.userName}</strong></Td>
                  <Td mono>
                    <span style={{ fontSize: 10, background: "#080c14", padding: "2px 8px", borderRadius: 4, border: "1px solid #1a2540", color: "#6a82a0" }}>
                      {log.rfidTag}
                    </span>
                  </Td>
                  <Td muted>{log.deviceToken}</Td>
                  <Td>
                    <span style={{ color: corStatus, fontWeight: 600, fontSize: 12, letterSpacing: "0.05em" }}>
                      {log.authorized ? "◉ AUTORIZADO" : "⊗ BLOQUEADO"}
                    </span>
                  </Td>
                  <Td muted>{log.message}</Td>
                </Tr>
              );
            })}
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
}