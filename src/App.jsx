import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AccessLog from "./pages/AccessLog";
import Users from "./pages/Users";
import Devices from "./pages/Devices";
import Login from "./pages/Login";

const PAGES = {
  dashboard: Dashboard,
  log: AccessLog,
  users: Users,
  devices: Devices,
};

const VALID_PAGES = Object.keys(PAGES);

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  // Garante que a página atual é válida; senão redireciona pro dashboard
  const safePage = VALID_PAGES.includes(page) ? page : "dashboard";
  const PageComponent = PAGES[safePage];

  return (
    <div style={{
      display: "flex", minHeight: "100vh", background: "#080c14",
      color: "#e2e8f4", fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      position: "relative",
    }}>
      <Sidebar current={safePage} onNavigate={setPage} onLogout={() => setAuthed(false)} />
      <main style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        <PageComponent />
      </main>
    </div>
  );
}
