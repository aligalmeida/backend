const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let produtoId; 

describe('/tarefas', () => {
  test('POST /produtos deve retornar 201 e um JSON com _id, nome e preco', async () => {
    const novoProduto = { nome: 'Laranja', preco: 10.0 };

    const response = await request
      .post('/produtos')
      .send(novoProduto)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);

  
    produtoId = response.body._id;
  });

  test('POST /produtos sem JSON deve retornar 422 e msg adequada', async () => {
    const response = await request
      .post('/produtos')
      .set('Accept', 'application/json'); 

    expect(response.status).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos deve retornar 200, JSON e array de objetos', async () => {
    const response = await request.get('/produtos');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /produtos/${id} deve retornar 200 e JSON com _id, nome e preco', async () => {
    const response = await request.get(`/produtos/${produtoId}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  test('GET /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await request.get('/produtos/0');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await request.get('/produtos/000000000000000000000000');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('PUT /produtos/${id} deve retornar 200 e JSON com valores atualizados', async () => {
    const payload = { nome: 'Laranja Pera', preco: 18.0 };

    const response = await request
      .put(`/produtos/${produtoId}`)
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.0);
  });

  test('PUT /produtos/${id} sem JSON deve retornar 422 e msg adequada', async () => {
    const response = await request
      .put(`/produtos/${produtoId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await request
      .put('/produtos/0')
      .send({ nome: 'X', preco: 1 })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await request
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'X', preco: 1 })
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/${id} deve retornar 204 e sem conteúdo', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('DELETE /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await request.delete('/produtos/0');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/000000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await request.delete('/produtos/000000000000000000000000');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});
