interface FuncionarioProps {
  id: number;
  nome: string;
  cargo: string;
  salario: number;
}

export default class Funcionario {
  id: number;
  nome: string;
  cargo: string;
  salario: number;

  constructor({ id, nome, cargo, salario }: FuncionarioProps) {
    this.id = id;
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }

  estaAtivo(): boolean {
    return this.salario > 0;
  }
}
