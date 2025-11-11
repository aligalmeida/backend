const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Fluxo de autenticação e acesso a /produtos', () => {
  let token;
  let novoToken;

  it('GET /produtos sem token → 401 e JSON { msg: "Não autorizado" }', async () => {
    const res = await request.get('/produtos');

    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });

  it('GET /produtos com token inválido → 401 e JSON { msg: "Token inválido" }', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', '123456789');

    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  it('POST /usuarios/login com credenciais válidas → 200 e JSON com { token }', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('GET /produtos com token válido → 200 e JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('POST /usuarios/renovar com token válido → 200 e JSON com { token }', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    novoToken = res.body.token;
    expect(typeof novoToken).toBe('string');
    expect(novoToken.length).toBeGreaterThan(0);
  });

  it('GET /produtos com novo token → 200 e JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', novoToken);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
