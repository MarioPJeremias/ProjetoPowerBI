import { executeQuery } from "./databricks.js";

export async function initializeDatabase() {
  console.log("📊 Initializing database schema...");

  const queries = [
    // Create Employees table
    `CREATE TABLE IF NOT EXISTS funcionarios (
      id_funcionario INT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sobrenome VARCHAR(255) NOT NULL,
      data_nascimento DATE,
      genero CHAR(1) NOT NULL,
      estado VARCHAR(2) NOT NULL,
      email VARCHAR(255),
      telefone VARCHAR(20),
      salario DECIMAL(10, 2),
      data_contratacao DATE,
      status VARCHAR(20) DEFAULT 'ATIVO',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create Students table
    `CREATE TABLE IF NOT EXISTS alunos (
      id_aluno INT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sobrenome VARCHAR(255),
      data_nascimento DATE,
      genero CHAR(1) NOT NULL,
      data_inscricao DATE NOT NULL,
      estado VARCHAR(2) NOT NULL,
      email VARCHAR(255),
      telefone VARCHAR(20),
      status VARCHAR(20) DEFAULT 'ATIVO',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create Courses table
    `CREATE TABLE IF NOT EXISTS cursos (
      id_curso INT PRIMARY KEY,
      nome_curso VARCHAR(255) NOT NULL,
      descricao TEXT,
      duracao_horas INT,
      estado_curso VARCHAR(20) DEFAULT 'ATIVO',
      valor_curso DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create Classes table
    `CREATE TABLE IF NOT EXISTS turmas (
      id_turma INT PRIMARY KEY,
      id_curso INT NOT NULL,
      id_instrutor INT,
      nome_turma VARCHAR(255) NOT NULL,
      data_inicio DATE NOT NULL,
      data_fim DATE,
      capacidade_maxima INT,
      numero_alunos INT DEFAULT 0,
      estado_turma VARCHAR(20) DEFAULT 'PLANEJADA',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_curso) REFERENCES cursos (id_curso),
      FOREIGN KEY (id_instrutor) REFERENCES funcionarios (id_funcionario)
    )`,

    // Create enrollment table (Students and Classes)
    `CREATE TABLE IF NOT EXISTS inscricoes (
      id_inscricao INT PRIMARY KEY,
      id_aluno INT NOT NULL,
      id_turma INT NOT NULL,
      data_inscricao DATE NOT NULL,
      status VARCHAR(20) DEFAULT 'ATIVA',
      nota_final DECIMAL(5, 2),
      data_conclusao DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_aluno) REFERENCES alunos (id_aluno),
      FOREIGN KEY (id_turma) REFERENCES turmas (id_turma),
      UNIQUE(id_aluno, id_turma)
    )`,

    // Create Revenue table
    `CREATE TABLE IF NOT EXISTS receitas (
      id_receita INT PRIMARY KEY,
      data_receita DATE NOT NULL,
      categoria VARCHAR(100) NOT NULL,
      subcategoria VARCHAR(100),
      quantidade INT DEFAULT 1,
      valor DECIMAL(10, 2) NOT NULL,
      descricao TEXT,
      id_aluno INT,
      id_turma INT,
      metodo_pagamento VARCHAR(50),
      status VARCHAR(20) DEFAULT 'RECEBIDO',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_aluno) REFERENCES alunos (id_aluno),
      FOREIGN KEY (id_turma) REFERENCES turmas (id_turma)
    )`,

    // Create Expenses table
    `CREATE TABLE IF NOT EXISTS despesas (
      id_despesa INT PRIMARY KEY,
      data_despesa DATE NOT NULL,
      categoria VARCHAR(100) NOT NULL,
      subcategoria VARCHAR(100),
      quantidade INT DEFAULT 1,
      valor DECIMAL(10, 2) NOT NULL,
      descricao TEXT,
      id_funcionario INT,
      metodo_pagamento VARCHAR(50),
      status VARCHAR(20) DEFAULT 'PENDENTE',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_funcionario) REFERENCES funcionarios (id_funcionario)
    )`,

    // Create Salary Payments table
    `CREATE TABLE IF NOT EXISTS pagamentos_salario (
      id_pagamento INT PRIMARY KEY,
      id_funcionario INT NOT NULL,
      mes_referencia DATE NOT NULL,
      valor_salario DECIMAL(10, 2) NOT NULL,
      desconto_inss DECIMAL(10, 2) DEFAULT 0,
      desconto_ir DECIMAL(10, 2) DEFAULT 0,
      outras_deducoes DECIMAL(10, 2) DEFAULT 0,
      valor_liquido DECIMAL(10, 2) NOT NULL,
      data_pagamento DATE,
      status VARCHAR(20) DEFAULT 'PENDENTE',
      observacoes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_funcionario) REFERENCES funcionarios (id_funcionario)
    )`,
  ];

  try {
    for (const query of queries) {
      await executeQuery(query);
    }
    console.log("✓ Database schema initialized successfully");
  } catch (error) {
    console.error("✗ Error initializing database:", error);
    throw error;
  }
}
