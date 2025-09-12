// Importa o express
const express = require("express");
const app = express();
const port = 3000;

// Array em memória
let tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware para processar JSON
app.use(express.json());

// Middleware para logar data/hora, método e URL
app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});

// 4a) Cria um Router específico para tarefas
const router = express.Router();

// 4b) GET /tarefas → lista todas as tarefas
router.get("/", (req, res) => {
  res.json(tarefas);
});

// 4c) POST /tarefas → cria nova tarefa
router.post("/", (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// 4d) GET /tarefas/:tarefaId → busca uma tarefa por ID
router.get("/:tarefaId", (req, res) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    throw Erro("Tarefa não encontrada");
  }

  res.json(tarefa);
});

// 4e) PUT /tarefas/:tarefaId → atualiza tarefa por ID
router.put("/:tarefaId", (req, res) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
     throw Erro("Tarefa não encontrada");
  }

  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;

  res.json(tarefa);
});

// 4f) DELETE /tarefas/:tarefaId → remove tarefa por ID
router.delete("/:tarefaId", (req, res) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    throw Erro("Tarefa não encontrada");
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

// Aplica o router em /tarefas
app.use("/tarefas", router);

app.use((err, req, res, next)=>{
    res.status(400).send(err.message)
})

// Sobe o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
