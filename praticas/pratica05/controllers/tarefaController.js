// controllers/tarefaController.js
const tarefaModel = require('../models/tarefaModel'); // (a)

// helper para aceitar :tarefaId ou :idTarefa
function getId(req) {
  return String(req.params?.tarefaId ?? req.params?.idTarefa ?? '');
}

// (b) listar -> chama model.listar() e retorna JSON do resultado
function listar(_req, res) {
  const resultado = tarefaModel.listar();
  return res.json(resultado);
}

// (g/h/i) buscarPeloId -> usa model.buscarPeloId(id)
function buscarPeloId(req, res) {
  const id = getId(req);
  const resultado = tarefaModel.buscarPeloId(id);

  if (resultado !== null) {
    return res.json(resultado);
  }
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

// (k) criar -> usa model.criar(tarefa) e retorna 201 + JSON
function criar(req, res) {
  const tarefa = req.body || {};
  const resultado = tarefaModel.criar(tarefa);
  return res.status(201).json(resultado);
}

// (n/o/p) atualizar -> usa model.atualizar(tarefa) ou 404
function atualizar(req, res) {
  const id = getId(req);
  const tarefa = { ...req.body, id };
  const resultado = tarefaModel.atualizar(tarefa);

  if (resultado !== null) {
    return res.json(resultado);
  }
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

// (r/s/t) remover -> usa model.remover(id) -> 204 ou 404
function remover(req, res) {
  const id = getId(req);
  const resultado = tarefaModel.remover(id);

  if (resultado !== null) {
    return res.status(204).send();
  }
  return res.status(404).json({ msg: 'Tarefa não encontrada' });
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};

