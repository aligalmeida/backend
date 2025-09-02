
function validarEntradas(a1, a2, a3) {

  if (a1 === undefined || a2 === undefined) {
    throw new Error('Notas a1 ou a2 não informadas');
  }


  if (a1 < 0 || a2 < 0) {
    throw new Error('Notas a1 ou a2 não podem ser negativas');
  }


  if (a3 !== undefined && a3 < 0) {
    throw new Error('Nota a3 não pode ser negativa');
  }
}

function calcularMediaBase(a1, a2) {

  return a1 * 0.4 + a2 * 0.6;
}

function calcularMediaAluno(a1, a2, a3) {
  validarEntradas(a1, a2, a3);

  const base = calcularMediaBase(a1, a2);


  if (a3 === undefined) {
    return base;
  }

  const combA1A3 = a1 * 0.4 + a3 * 0.6;
  const combA3A2 = a3 * 0.4 + a2 * 0.6;

  return Math.max(base, combA1A3, combA3A2);
}

module.exports = { calcularMediaAluno };