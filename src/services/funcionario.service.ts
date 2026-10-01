import Funcionario from "../models/funcionario.model";

const funcionarios: Funcionario[] = [
  new Funcionario({ id: 1, nome: "João", cargo: "Desenvolvedor", salario: 4000 }),
  new Funcionario({ id: 2, nome: "Maria", cargo: "Designer", salario: 3500 })
];

interface CriarFuncionarioDados {
  nome: string;
  cargo: string;
  salario?: number;
}

export function listar(): Funcionario[] {
  return funcionarios;
}

export function buscarPorId(id: string): Funcionario | undefined {
  return funcionarios.find(f => f.id === Number(id));
}

export function criar(dados: CriarFuncionarioDados): Funcionario {
  if (!dados.nome || !dados.cargo) {
    throw new Error("nome e cargo são obrigatórios");
  }

  const funcionario = new Funcionario({
    id: funcionarios.length + 1,
    nome: dados.nome,
    cargo: dados.cargo,
    salario: dados.salario || 0
  });

  funcionarios.push(funcionario);
  return funcionario;
}
