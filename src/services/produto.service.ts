import Produto from "../models/produto.model";
import {
  AtualizarProdutoDados,
  CriarProdutoDados,
  ProdutoRepository
} from "../repositories/produto.repository";
import { ProdutoRepositorySequelize } from "../repositories/produto.repository.sequelize";

// A regra de negócio (Service) depende só da interface ProdutoRepository,
// não do Sequelize diretamente — isso é a Dependency Inversion do slide.
const repository: ProdutoRepository = new ProdutoRepositorySequelize();

export async function listar(): Promise<Produto[]> {
  return repository.listar();
}

export async function buscarPorId(id: string): Promise<Produto | null> {
  return repository.buscarPorId(Number(id));
}

export async function criar(dados: CriarProdutoDados): Promise<Produto> {
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }

  return repository.criar(dados);
}

export async function atualizar(
  id: string,
  dados: AtualizarProdutoDados
): Promise<Produto | null> {
  if (dados.nome === undefined && dados.preco === undefined) {
    throw new Error("informe nome e/ou preco para atualizar");
  }

  return repository.atualizar(Number(id), dados);
}

export async function deletar(id: string): Promise<boolean> {
  return repository.deletar(Number(id));
}
