import request from "supertest";
import { app } from "../app";
import { sequelize } from "../database/sequelize";
import "../database/produto.sequelize-model";

beforeAll(async () => {
  // Banco SQLite em memória (NODE_ENV=test), recriado do zero pros testes.
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("CRUD de /produtos", () => {
  let idCriado: number;

  it("GET /produtos começa vazio", async () => {
    const resposta = await request(app).get("/produtos");

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([]);
  });

  it("POST /produtos cria um produto", async () => {
    const resposta = await request(app)
      .post("/produtos")
      .send({ nome: "Notebook", preco: 3500 });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toMatchObject({ nome: "Notebook", preco: 3500 });
    expect(resposta.body.id).toBeDefined();

    idCriado = resposta.body.id;
  });

  it("POST /produtos sem nome/preco retorna 400", async () => {
    const resposta = await request(app).post("/produtos").send({});

    expect(resposta.status).toBe(400);
    expect(resposta.body.mensagem).toMatch(/obrigatórios/);
  });

  it("GET /produtos lista o produto criado", async () => {
    const resposta = await request(app).get("/produtos");

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(1);
  });

  it("GET /produtos/:id retorna o produto existente", async () => {
    const resposta = await request(app).get(`/produtos/${idCriado}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body).toMatchObject({ id: idCriado, nome: "Notebook" });
  });

  it("GET /produtos/:id com id inexistente retorna 404", async () => {
    const resposta = await request(app).get("/produtos/999999");

    expect(resposta.status).toBe(404);
    expect(resposta.body.mensagem).toBe("Produto não encontrado");
  });

  it("PUT /produtos/:id atualiza só o preço", async () => {
    const resposta = await request(app)
      .put(`/produtos/${idCriado}`)
      .send({ preco: 2999 });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toMatchObject({
      id: idCriado,
      nome: "Notebook",
      preco: 2999
    });
  });

  it("PUT /produtos/:id atualiza só o nome", async () => {
    const resposta = await request(app)
      .put(`/produtos/${idCriado}`)
      .send({ nome: "Notebook Gamer" });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toMatchObject({
      id: idCriado,
      nome: "Notebook Gamer",
      preco: 2999
    });
  });

  it("PUT /produtos/:id sem corpo retorna 400", async () => {
    const resposta = await request(app).put(`/produtos/${idCriado}`).send({});

    expect(resposta.status).toBe(400);
  });

  it("PUT /produtos/:id com id inexistente retorna 404", async () => {
    const resposta = await request(app)
      .put("/produtos/999999")
      .send({ preco: 10 });

    expect(resposta.status).toBe(404);
  });

  it("DELETE /produtos/:id remove o produto", async () => {
    const resposta = await request(app).delete(`/produtos/${idCriado}`);

    expect(resposta.status).toBe(204);
  });

  it("GET /produtos/:id depois de apagado retorna 404", async () => {
    const resposta = await request(app).get(`/produtos/${idCriado}`);

    expect(resposta.status).toBe(404);
  });

  it("DELETE /produtos/:id com id inexistente retorna 404", async () => {
    const resposta = await request(app).delete(`/produtos/${idCriado}`);

    expect(resposta.status).toBe(404);
  });
});
