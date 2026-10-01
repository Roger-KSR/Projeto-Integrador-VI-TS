import { Request, Response } from "express";
import * as service from "../services/funcionario.service";

export const listar = (req: Request, res: Response): void => {
  const funcionarios = service.listar();
  res.status(200).json(funcionarios);
};

export const buscarPorId = (req: Request, res: Response): void => {
  const funcionario = service.buscarPorId(String(req.params.id));

  if (!funcionario) {
    res.status(404).json({ mensagem: "Funcionário não encontrado" });
    return;
  }

  res.status(200).json(funcionario);
};

export const criar = (req: Request, res: Response): void => {
  try {
    const funcionario = service.criar(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ mensagem });
  }
};
