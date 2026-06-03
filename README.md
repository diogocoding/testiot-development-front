# 🛡️ IoT Access Control System — Frontend Administrativo

Interface de gerenciamento web para o **Sistema de Controle de Acesso IoT**, desenvolvido como projeto prático do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da Faculdade SENAC. Este painel permite o monitoramento em tempo real de hardware (ESP32), auditoria de logs e gestão de permissões de usuários por RFID.

---

## 🚀 Visão Geral do Projeto

A aplicação atua como o **centro de comando** do sistema físico. Quando um cartão RFID é aproximado do sensor ultrassônico acoplado ao ESP32, o hardware faz uma requisição HTTP à API. O frontend, por sua vez, consome essa mesma API para atualizar o dashboard instantaneamente, permitindo ações críticas como o **bloqueio imediato de credenciais**.

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
|---|---|
| Framework | React |
| Build Tool | Vite |
| Gerenciador de Pacotes | npm |
| Hospedagem | Vercel (CI/CD) |
| Integração | Fetch API (RESTful com backend na AWS) |

---

## ⚙️ Funcionalidades Core

- **Dashboard em Tempo Real** — Feed de eventos *LivePulse* atualizado a cada 3 segundos via `setInterval`.
- **Métricas Instantâneas** — Total de acessos do dia, usuários com acesso ativo e quantidade de hardwares respondendo na rede.
- **Auditoria de Logs** (`AccessLog.jsx`) — Tabela detalhada com data, horário, UID do cartão e status da validação.
- **Filtros Avançados** — Filtragem do histórico pelas tags `LIBERADO`, `NEGADO` e `BLOQUEADO`.
- **Gestão de Usuários** (`Users.jsx`) — Interface dupla (Grid ou Tabela) para gerenciar o cadastro de pessoas e seus cartões.
- **Kill Switch (Toggle)** — Altera o status `active` do usuário instantaneamente, forçando a catraca a retornar o erro `403 Bloqueado` na próxima tentativa.
- **Monitoramento de Hardware** (`Devices.jsx`) — Acompanhamento do status `ONLINE`/`OFFLINE` dos leitores ESP32 com base no último ping recebido.

---

## 📂 Estrutura de Diretórios

```
src/
├── App.jsx               # Roteador central (sem dependências pesadas)
├── config.js             # Variáveis de ambiente centralizadas (URL da API)
├── components/
│   ├── UI.jsx            # Design System interno (modais, botões, tabelas, badges)
│   └── Sidebar.jsx       # Menu lateral fixo com navegação e estado ativo
└── pages/
    ├── Dashboard.jsx
    ├── AccessLog.jsx
    ├── Users.jsx
    └── Devices.jsx
```

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão LTS (recomendado: v20.11.0 ou superior)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   VITE_API_URL=https://sua-url-na-aws.amazonaws.com
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse o painel no navegador:**
   ```
   http://localhost:5173
   ```

---

## 👨‍💻 Autoria

**Desenvolvimento Frontend:** Diogo Nascimento da Silva

**Contexto:** Projeto Integrador 2026 — Faculdade SENAC
