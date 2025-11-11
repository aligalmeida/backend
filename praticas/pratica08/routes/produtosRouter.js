// b) Importa o Express
const express = require('express');

// c) Importa do authMiddleware
const { verificarToken } = require('../middlewares/authMiddleware');

// d) Instância do Router
const router = express.Router();

/**
 * e,f) GET /produtos (protegido)
 * Observação: como o router será montado em "/produtos" no app.js,
 * aqui usamos a rota raiz "/" para que a URL final seja exatamente "/produtos".
 */
router.get('/', verificarToken, (req, res) => {
  return res.json([]); // JSON de array vazio
});

// g) Exporta o router
module.exports = router;
