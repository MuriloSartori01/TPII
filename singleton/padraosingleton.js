

// Classe GerenciadorAlunos (Padrão Singleton)
class GerenciadorAlunos {
  constructor() {
    // Verifica se já existe uma instância rodando no sistema
    if (GerenciadorAlunos.instancia) {
      return GerenciadorAlunos.instancia;
    }

    // Array que vai guardar todos os alunos 
    this.alunosMatriculados = [];
    
    // Salva a instância atual para as próximas chamadas
    GerenciadorAlunos.instancia = this; 
  }

  matricular(aluno) {
    this.alunosMatriculados.push(aluno);
    console.log(`=> Sucesso: ${aluno.nome} matriculado no SIGA!`);
  }

  listar() {
    console.log("\n--- Lista de Alunos no SIGA ---");
    this.alunosMatriculados.forEach((a, i) => {
      console.log(`${i + 1}. ${a.nome}, ${a.idade} anos | Curso: ${a.curso} (${a.periodo})`);
    });
    console.log("-------------------------------\n");
  }
}

// 2. Classe Aluno (Padrão Prototype)
class Aluno {
  constructor(nome, idade, curso, periodo, unidade) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.periodo = periodo;
    this.unidade = unidade;
  }

  // Método clone para fazer a cópia superficial 
  clone() {
    // Cria um objeto novo mantendo o protótipo e copia as propriedades
    let copia = Object.create(Object.getPrototypeOf(this));
    Object.assign(copia, this);
    return copia;
  }
}

// Testes do Sistema

console.log("PASSO 1: Validar unicidade do Singleton");
const siga1 = new GerenciadorAlunos();
const siga2 = new GerenciadorAlunos();

if (siga1 === siga2) {
  console.log("OK! siga1 e siga2 são a mesma instância.\n");
} else {
  console.log("Erro: O Singleton falhou.\n");
}

console.log("PASSO 2: Criar o Aluno Protótipo");
const alunoBaseDSM = new Aluno(
  "Nome Padrão", 
  0, 
  "Desenvolvimento de Software Multiplataforma", 
  "Noturno", 
  "FATEC Diadema"
);
console.log("Protótipo DSM criado com sucesso.\n");

console.log("PASSO 3: Clonar e modificar dados");
const alunoSartori = alunoBaseDSM.clone();
alunoSartori.nome = "Sartori";
alunoSartori.idade = 20;

const alunoMaria = alunoBaseDSM.clone();
alunoMaria.nome = "Maria";
alunoMaria.idade = 22;
console.log("Alunos clonados e dados alterados.\n");

console.log("PASSO 4: Adicionar clones no Singleton e listar");
// Adicionando um no siga1 e outro no siga2 para provar que vão pro mesmo lugar
siga1.matricular(alunoSartori);
siga2.matricular(alunoMaria); 

siga1.listar();

console.log("PASSO 5: Comprovar que o protótipo original não mudou");
console.log(`Nome do protótipo: ${alunoBaseDSM.nome} (esperado: "Nome Padrão")`);
console.log(`Curso do protótipo: ${alunoBaseDSM.curso}`);