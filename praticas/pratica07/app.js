require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const produtosRouter = require('./routes/produtosRouter.js');

const connectionString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

mongoose.connect(connectionString)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB Atlas:', err));

const app = express();

app.use(express.json());


app.use(produtosRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API Pratica07 conectada ao MongoDB Atlas!' });
});

module.exports = app;

