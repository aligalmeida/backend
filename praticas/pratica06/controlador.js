
const { Tarefa } = require("./modelo");

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    await tarefa.alterar();
    console.log(`Tarefa '${nome}' atualizada com sucesso!`);
  } else {
    console.log(`Tarefa '${nome}' não encontrada para atualização.`);
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
    console.log(`🔴 Tarefa '${nome}' removida com sucesso!`);
  } else {
    console.log(`⚠️ Tarefa '${nome}' não encontrada para remoção.`);
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};

