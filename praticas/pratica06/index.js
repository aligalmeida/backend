const readline = require("readline-sync");

const controlador = require("./controlador");

function menu() {
  console.log("\n===== MENU PRINCIPAL =====");
  console.log("1 - Adicionar contato");
  console.log("2 - Buscar contato");
  console.log("3 - Atualizar contato");
  console.log("4 - Remover contato");
  console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
  if (opcao === "1") {
    console.log("\n👉 Opção 1 selecionada: Adicionar contato");
    const nome = readline.question("Digite o nome da tarefa: ");
    await controlador.adicionarTarefa(nome);

  } else if (opcao === "2") {
    console.log("\n👉 Opção 2 selecionada: Buscar contato");
    const nome = readline.question("Digite o nome da tarefa: ");
    const tarefa = await controlador.buscarTarefa(nome);

    if (tarefa && tarefa.id) {
      console.log("\n🔍 Tarefa encontrada:");
      console.log("ID:", tarefa.id);
      console.log("Nome:", tarefa.nome);
      console.log("Concluída:", tarefa.concluida ? "Sim" : "Não");
    } else {
      console.log(`⚠️ Nenhuma tarefa encontrada com o nome '${nome}'.`);
    }

  } else if (opcao === "3") {
    console.log("\n👉 Opção 3 selecionada: Atualizar contato");
    const nome = readline.question("Digite o nome da tarefa: ");
    const concluidaTexto = readline.question("A tarefa está concluída? (sim/não): ");
    const concluida = concluidaTexto.toLowerCase() === "sim";

    await controlador.atualizarTarefa(nome, concluida);

  } else if (opcao === "4") {
    console.log("\n👉 Opção 4 selecionada: Remover contato");
    const nome = readline.question("Digite o nome da tarefa: ");
    await controlador.removerTarefa(nome);

  } else if (opcao === "5") {
    console.log("\n👋 Encerrando o sistema... Até logo!");
    process.exit(); 

  } else {
    console.log("⚠️ Opção inválida! Escolha um número de 1 a 5.");
  }
}

async function main() {
  while (true) {
    menu(); 
    const opcao = readline.question("\nEscolha uma opção: "); 
    await escolherOpcao(opcao); 
  }
}

main();
