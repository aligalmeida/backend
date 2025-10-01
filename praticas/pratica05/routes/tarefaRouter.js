// routes/tarefaRouter.js

const express = require('express');

// a) importar tudo do controller
// (o passo-a-passo menciona "../controllers/tarefaRouter.js",
// mas o nome correto do arquivo do controller será "tarefaController.js")
const tarefaController = require('../controllers/tarefaController');

const router = express.Router();

// b) GET "/" -> tarefaController.listar
router.get('/', tarefaController.listar);

// f) GET "/:tarefaId" -> tarefaController.buscarPeloId
router.get('/:tarefaId', tarefaController.buscarPeloId);

// j) POST "/" -> tarefaController.criar
router.post('/', tarefaController.criar);

// m) PUT "/:tarefaId" -> tarefaController.atualizar
router.put('/:tarefaId', tarefaController.atualizar);

// q) DELETE "/:tarefaId" -> tarefaController.remover
router.delete('/:tarefaId', tarefaController.remover);

// f) exportar o router (última linha)
module.exports = router;


