import { Request, Response } from "express";
import * as service from "../services/produto.service";

export function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : "Erro desconhecido";
}

export const listar = async (req: Request, res: Response): Promise<void> => {
  const produtos = await service.listar();
  res.status(200).json(produtos);
};

export const buscarPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const produto = await service.buscarPorId(String(req.params.id));

  if (!produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  res.status(200).json(produto);
};

export const criar = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await service.criar(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ mensagem: mensagemDeErro(error) });
  }
};

export const atualizar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const produto = await service.atualizar(String(req.params.id), req.body);

    if (!produto) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }

    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json({ mensagem: mensagemDeErro(error) });
  }
};

export const deletar = async (
  req: Request,
  res: Response
): Promise<void> => {
  const apagado = await service.deletar(String(req.params.id));

  if (!apagado) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  res.status(204).send();
};
