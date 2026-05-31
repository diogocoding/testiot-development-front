import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AccessLog from "./pages/AccessLog";
import Users from "./pages/Users";
import Devices from "./pages/Devices";

const PAGES = {
  dashboard: Dashboard,
  log: AccessLog,
  users: Users,
  devices: Devices,
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const PageComponent = PAGES[page] || Dashboard;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#080c14", color: "#e2e8f4", fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
      <Sidebar current={page} onNavigate={setPage} />
      <main style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <PageComponent />
      </main>
    </div>
  );
}
