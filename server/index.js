const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "online", project: "DEVX Solutions" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, project } = req.body;
  console.log("Novo contato:", { name, email, project });
  res.json({ ok: true, message: "Mensagem recebida com sucesso!" });
});

const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor DEVX rodando em http://localhost:${PORT}`);
});
