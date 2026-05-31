export const mockLogs = [
  { id: 1, uid: "A1 B2 C3 D4", user: "Diogo Nascimento", status: "granted", time: "14:52:03", date: "2025-05-28", device: "Entrada Principal" },
  { id: 2, uid: "FF 3A 91 C0", user: "Carlos Machado", status: "granted", time: "14:48:17", date: "2025-05-28", device: "Entrada Principal" },
  { id: 3, uid: "00 DE AD BE", user: "Desconhecido", status: "denied", time: "14:39:44", date: "2025-05-28", device: "Entrada Principal" },
  { id: 4, uid: "B3 77 F2 11", user: "Miguel Veloso", status: "granted", time: "14:33:09", date: "2025-05-28", device: "Lab IoT" },
  { id: 5, uid: "C9 04 AA 5E", user: "Maíra Lourenço", status: "granted", time: "14:20:55", date: "2025-05-28", device: "Entrada Principal" },
  { id: 6, uid: "12 34 56 78", user: "Desconhecido", status: "denied", time: "13:58:22", date: "2025-05-28", device: "Lab IoT" },
  { id: 7, uid: "A1 B2 C3 D4", user: "Diogo Nascimento", status: "granted", time: "09:12:01", date: "2025-05-28", device: "Entrada Principal" },
  { id: 8, uid: "E5 60 1D 3F", user: "Gustavo Henrique", status: "granted", time: "09:05:44", date: "2025-05-28", device: "Entrada Principal" },
  { id: 9, uid: "FF 3A 91 C0", user: "Carlos Machado", status: "granted", time: "08:59:30", date: "2025-05-27", device: "Entrada Principal" },
  { id: 10, uid: "B3 77 F2 11", user: "Miguel Veloso", status: "blocked", time: "08:44:11", date: "2025-05-27", device: "Lab IoT" },
  { id: 11, uid: "C9 04 AA 5E", user: "Maíra Lourenço", status: "granted", time: "08:38:02", date: "2025-05-27", device: "Entrada Principal" },
  { id: 12, uid: "99 AB CD EF", user: "Pedro Juan", status: "granted", time: "08:30:19", date: "2025-05-27", device: "Lab IoT" },
];

export const mockUsers = [
  { id: 1, name: "Diogo Nascimento", uid: "A1 B2 C3 D4", role: "Desenvolvedor", active: true, accesses: 42, lastSeen: "Hoje 14:52" },
  { id: 2, name: "Carlos Machado", uid: "FF 3A 91 C0", role: "DevOps", active: true, accesses: 38, lastSeen: "Hoje 14:48" },
  { id: 3, name: "Miguel Veloso", uid: "B3 77 F2 11", role: "Documentação", active: false, accesses: 19, lastSeen: "Ontem 08:44" },
  { id: 4, name: "Maíra Lourenço", uid: "C9 04 AA 5E", role: "Documentação", active: true, accesses: 27, lastSeen: "Hoje 14:20" },
  { id: 5, name: "Gustavo Henrique", uid: "E5 60 1D 3F", role: "Hardware", active: true, accesses: 33, lastSeen: "Hoje 09:05" },
  { id: 6, name: "Pedro Juan", uid: "99 AB CD EF", role: "Hardware / BD", active: true, accesses: 21, lastSeen: "Ontem 08:30" },
  { id: 7, name: "Vinícius Santos", uid: "7C 2B E8 44", role: "Hardware / BD", active: true, accesses: 29, lastSeen: "Hoje 08:15" },
  { id: 8, name: "Wslany Lima", uid: "3D 5F A0 CC", role: "Documentação", active: true, accesses: 15, lastSeen: "27/05 10:02" },
];

export const mockDevices = [
  { id: 1, name: "Entrada Principal", location: "Térreo — Portão A", status: "online", lastPing: "2s atrás", ip: "192.168.1.101", accesses: 87, uid: "ESP32-001" },
  { id: 2, name: "Lab IoT", location: "2º Andar — Sala 214", status: "online", lastPing: "4s atrás", ip: "192.168.1.102", accesses: 34, uid: "ESP32-002" },
  { id: 3, name: "Sala de Servidores", location: "Subsolo — B1", status: "offline", lastPing: "12min atrás", ip: "192.168.1.103", accesses: 0, uid: "ESP32-003" },
];

export const mockStats = {
  todayTotal: 8,
  todayGranted: 6,
  todayDenied: 2,
  weekTotal: 121,
  activeUsers: 7,
  devicesOnline: 2,
};
