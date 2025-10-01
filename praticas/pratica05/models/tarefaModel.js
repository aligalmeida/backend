// models/tarefaModel.js

// (d) array em memória
const tarefas = [];

// (e/f) listar -> retorna o array
function listar() {
  return tarefas;
}

// (i/j) buscarPeloId -> retorna objeto ou null
function buscarPeloId(tarefaId) {
  const id = String(tarefaId);
  const encontrada = tarefas.find(t => String(t.id) === id);
  return encontrada ?? null;
}

// (l/m) criar -> gera id, monta objeto e guarda no array
function criar(tarefa) {
  const id = Math.random().toString(36).substr(2, 4); // 4 chars
  const nova = { id, ...tarefa };
  tarefas.push(nova);
  return nova;
}

// (p/q) atualizar -> sobrescreve props e retorna atualizada ou null
function atualizar(tarefa) {
  const id = String(tarefa.id);
  const idx = tarefas.findIndex(t => String(t.id) === id);
  if (idx === -1) return null;

  tarefas[idx] = { ...tarefas[idx], ...tarefa, id: tarefas[idx].id };
  return tarefas[idx];
}

// (t/u) remover -> remove do array e retorna removida ou null
function remover(tarefaId) {
  const id = String(tarefaId);
  const idx = tarefas.findIndex(t => String(t.id) === id);
  if (idx === -1) return null;

  const [removida] = tarefas.splice(idx, 1);
  return removida;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};
