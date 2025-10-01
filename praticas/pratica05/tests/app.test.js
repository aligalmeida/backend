// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('API REST - Tarefas e Produtos', () => {
  const api = request(app);
  let tarefaId;

  // e) GET /tarefas -> 200 + JSON
  test('GET /tarefas deve retornar 200 e JSON', async () => {
    await api
      .get('/tarefas')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  // f) POST /tarefas -> 201 + JSON, guardar id (apenas id, conforme passo m)
  test('POST /tarefas deve retornar 201 e JSON, guardando o id', async () => {
    const payload = { nome: 'Estudar Node', concluida: false };

    const res = await api
      .post('/tarefas')
      .send(payload)
      .expect(201)
      .expect('Content-Type', /json/);

    // Mantemos estritamente o passo m: resposta só tem { id: "1a2b" }
    expect(res.body).toHaveProperty('id');
    tarefaId = res.body.id;
  });

  // g) GET /tarefas/:id (id criado) -> 200 + JSON
  test('GET /tarefas/:id (id criado) deve retornar 200 e JSON', async () => {
    await api
      .get(`/tarefas/${tarefaId}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  // h) GET /tarefas/1 -> 404 + JSON
  test('GET /tarefas/1 deve retornar 404 e JSON', async () => {
    await api
      .get('/tarefas/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });

  // i) PUT /produtos/:id (usar id criado) -> 200 + JSON
  test('PUT /produtos/:id (id criado) deve retornar 200 e JSON', async () => {
    const payload = { nome: 'Estudar Node e Express', concluida: true };

    await api
      .put(`/produtos/${tarefaId}`)
      .send(payload)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  // j) PUT /produtos/1 -> 404 + JSON
  test('PUT /produtos/1 deve retornar 404 e JSON', async () => {
    await api
      .put('/produtos/1')
      .send({ nome: 'X', concluida: true })
      .expect(404)
      .expect('Content-Type', /json/);
  });

  // k) DELETE /produtos/:id (usar id criado) -> 204 sem corpo
  test('DELETE /produtos/:id (id criado) deve retornar 204 e sem conteúdo', async () => {
    const res = await api.delete(`/produtos/${tarefaId}`).expect(204);
    expect(res.text === '' || res.text === undefined).toBe(true);
  });

  // l) DELETE /produtos/1 -> 404 + JSON
  test('DELETE /produtos/1 deve retornar 404 e JSON', async () => {
    await api
      .delete('/produtos/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });
});
