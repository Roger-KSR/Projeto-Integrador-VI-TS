import { mensagemDeErro } from "../controllers/produto.controller";

describe("mensagemDeErro", () => {
  it("retorna a mensagem quando é um Error", () => {
    expect(mensagemDeErro(new Error("deu ruim"))).toBe("deu ruim");
  });

  it("retorna mensagem padrão quando não é um Error", () => {
    expect(mensagemDeErro("qualquer coisa")).toBe("Erro desconhecido");
  });
});
