const { MongoClient } = require("mongodb");
const url = "mongodb+srv://usrTarefas:abcd1234@cluster0.ry5wx4y.mongodb.net/";

const client = new MongoClient(url);

async function conecta() {
    try {
        await client.connect();
        return client.db("agenda");
    } catch (e) {
    console.log("Erro ao conectar no Mongodb",
        e.message
    );
    }
}

module.exports = conecta;
    

