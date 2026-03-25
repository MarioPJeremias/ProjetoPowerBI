import { Request, Response } from "express";
import { executeQuery } from "../db/databricks.js";

export async function getRevenues(req: Request, res: Response) {
  try {
    const revenues = await executeQuery(`
      SELECT r.*, a.nome as nome_aluno, t.nome_turma
      FROM receitas r
      LEFT JOIN alunos a ON r.id_aluno = a.id_aluno
      LEFT JOIN turmas t ON r.id_turma = t.id_turma
      ORDER BY r.data_receita DESC
    `);
    res.json(revenues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenues" });
  }
}

export async function createRevenue(req: Request, res: Response) {
  try {
    const {
      data_receita,
      categoria,
      subcategoria,
      quantidade,
      valor,
      descricao,
      id_aluno,
      id_turma,
      metodo_pagamento,
    } = req.body;
    const id_receita = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO receitas (
        id_receita, data_receita, categoria, subcategoria,
        quantidade, valor, descricao, id_aluno, id_turma, metodo_pagamento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      id_receita,
      data_receita,
      categoria,
      subcategoria,
      quantidade || 1,
      valor,
      descricao,
      id_aluno,
      id_turma,
      metodo_pagamento,
    ]);

    res.status(201).json({
      id_receita,
      message: "Revenue recorded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create revenue" });
  }
}

export async function getExpenses(req: Request, res: Response) {
  try {
    const expenses = await executeQuery(`
      SELECT d.*, f.nome as nome_funcionario
      FROM despesas d
      LEFT JOIN funcionarios f ON d.id_funcionario = f.id_funcionario
      ORDER BY d.data_despesa DESC
    `);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
}

export async function createExpense(req: Request, res: Response) {
  try {
    const {
      data_despesa,
      categoria,
      subcategoria,
      quantidade,
      valor,
      descricao,
      id_funcionario,
      metodo_pagamento,
    } = req.body;
    const id_despesa = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO despesas (
        id_despesa, data_despesa, categoria, subcategoria,
        quantidade, valor, descricao, id_funcionario, metodo_pagamento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      id_despesa,
      data_despesa,
      categoria,
      subcategoria,
      quantidade || 1,
      valor,
      descricao,
      id_funcionario,
      metodo_pagamento,
    ]);

    res.status(201).json({
      id_despesa,
      message: "Expense recorded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
}

export async function getFinancialSummary(req: Request, res: Response) {
  try {
    const summary = await executeQuery(`
      SELECT
        (SELECT COALESCE(SUM(valor), 0) FROM receitas WHERE status = 'RECEBIDO') as total_receitas,
        (SELECT COALESCE(SUM(valor), 0) FROM despesas WHERE status != 'CANCELADO') as total_despesas,
        (SELECT COUNT(*) FROM alunos WHERE status = 'ATIVO') as total_alunos_ativos,
        (SELECT COUNT(*) FROM turmas WHERE estado_turma IN ('PLANEJADA', 'EM_ANDAMENTO')) as turmas_ativas
    `);

    const data = summary[0];
    const lucro_liquido = data.total_receitas - data.total_despesas;

    res.json({
      total_receitas: data.total_receitas,
      total_despesas: data.total_despesas,
      lucro_liquido: lucro_liquido,
      total_alunos_ativos: data.total_alunos_ativos,
      turmas_ativas: data.turmas_ativas,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch financial summary" });
  }
}
