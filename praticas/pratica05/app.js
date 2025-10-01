const express = require('express');
const tarefaRouter = require('./routes/tarefaRouter');

const app = express();
app.use(express.json());

// Atende ambos os prefixos
app.use('/tarefas', tarefaRouter);
app.use('/produtos', tarefaRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

module.exports = app;


