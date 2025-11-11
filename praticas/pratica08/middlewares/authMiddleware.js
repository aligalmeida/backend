// b) Importa o jsonwebtoken
const jwt = require('jsonwebtoken');

/**
 * c) verificarToken(req, res, next)
 * d) Extrai o token do cabeçalho "authorization"
 * e) Se existir, verifica e injeta em req.usuario; chama next()
 * f) Em erro de verificação, retorna 401 { msg: "Token inválido" }
 *    (Quando não houver token, retorna 401 { msg: "Não autorizado" })
 */
function verificarToken(req, res, next) {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // adiciona o resultado em req.usuario
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

/**
 * g) gerarToken(payload)
 * h) Usa expiresIn = 120 e retorna jwt.sign(payload, JWT_SECRET, { expiresIn })
 * i) Em exceção, lança "Erro ao gerar o token"
 */
function gerarToken(payload) {
  try {
    const expiresIn = 120; // segundos
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

// j) Exporta as funções
module.exports = {
  verificarToken,
  gerarToken,
};
