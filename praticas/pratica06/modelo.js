
const { conectarDb } = require("./database");

class Tarefa {
  constructor(nome, concluida) {
    this.db = null;
    this.collection = null;
    this.id = null;
    this.nome = nome;
    this.concluida = concluida;
  }

  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }

  async inserir() {
    if (!this.collection) {
      throw new Error("Banco de dados não inicializado. Execute init() antes de inserir.");
    }

    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;

    console.log("Tarefa inserida com sucesso! ID:", this.id);
  }

  async alterar() {
    if (!this.collection) {
      throw new Error("Banco de dados não inicializado. Execute init() antes de alterar.");
    }

    if (!this.id) {
      throw new Error("ID da tarefa não definido. Insira ou recupere uma tarefa antes de alterar.");
    }

    await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );

    console.log("Tarefa atualizada com sucesso!");
  }

  async deletar() {
    if (!this.collection) {
      throw new Error("Banco de dados não inicializado. Execute init() antes de deletar.");
    }

    await this.collection.deleteOne({ nome: this.nome });

    console.log(`Tarefa '${this.nome}' deletada com sucesso!`);
  }

  async buscar() {
    if (!this.collection) {
      throw new Error("Banco de dados não inicializado. Execute init() antes de buscar.");
    }

    const resultado = await this.collection.findOne({ nome: this.nome });

    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;

      console.log("Tarefa encontrada e atualizada na instância:", this);
    } else {
      console.log(`Nenhuma tarefa encontrada com o nome '${this.nome}'.`);
    }
  }
}

module.exports = { Tarefa };












