const express = require('express');


const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/login', (req, res) => {
  const email = req.body?.email || req.body?.usuario; 
 
  const token = gerarToken({ email });
  return res.status(200).json({ token });
});

router.post('/renovar', verificarToken, (req, res) => {
  const email = req.usuario?.email;
  const token = gerarToken({ email });
  return res.status(200).json({ token });
});


module.exports = router;
