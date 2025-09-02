const { calcularMediaAluno } = 
require('../src/calcularMediaAluno');

test('A função calcularMediaAluno deve estar definida', () => {
  expect(calcularMediaAluno).toBeDefined();
});


test('Lança erro se a1 não for informada', () => {
  expect(() => calcularMediaAluno(undefined, 7)).toThrow('Notas a1 ou a2 não informadas');
});

test('Lança erro se a2 não for informada', () => {
  expect(() => calcularMediaAluno(7, undefined)).toThrow('Notas a1 ou a2 não informadas');
});


test('Lança erro se a1 for negativa', () => {
  expect(() => calcularMediaAluno(-1, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('Lança erro se a2 for negativa', () => {
  expect(() => calcularMediaAluno(7, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
});


test('Calcula média base quando a3 não é informada', () => {
  const media = calcularMediaAluno(5, 7); 
  expect(media).toBeCloseTo(6.2, 5);
});


test('Lança erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(7, 8, -1)).toThrow('Nota a3 não pode ser negativa');
});


test('Com a3 informada, escolhe melhor combinação (a1 com a3)', () => {
  
  const media = calcularMediaAluno(5, 6, 9);
  expect(media).toBeCloseTo(7.4, 5);
});


test('Com a3 informada, escolhe melhor combinação (a3 com a2)', () => {
  
  const media = calcularMediaAluno(3, 9, 8);
  expect(media).toBeCloseTo(8.6, 5);
});