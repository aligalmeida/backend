const calculadora = require('../src/calculadora.js'); 

describe('Testando a Calculadora', () => {
 test('1 + 2 = 3', () => {
   expect(calculadora.somar(1, 2)).toBe(3);
 });

 test('1 * 0 = 0', () => {
   expect(calculadora.multiplicar(1, 0)).toEqual(0);
 });

 test('2 - 5 não é 3', () => {
   expect(calculadora.subtrair(2, 5)).not.toBe(3);
 });
 
 test('5 / 3 é aproximadamente 1.7', () => {
   expect(calculadora.dividir(5, 3)).toBeCloseTo(1.7, 1);
 });

 test("Não pode dividir por ZERO", function(){
  expect(calculadora.dividir).toBeDefined();
  expect(() => calculadora.dividir(2, 0))
  .toThrow("Divisão por zero!");
 });

})
