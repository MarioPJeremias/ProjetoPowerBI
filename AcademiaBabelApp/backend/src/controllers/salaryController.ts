import { Request, Response } from "express";
import { executeQuery } from "../db/databricks.js";

export async function getSalaryPayments(req: Request, res: Response) {
  try {
    const payments = await executeQuery(`
      SELECT ps.*, f.nome, f.sobrenome
      FROM pagamentos_salario ps
      JOIN funcionarios f ON ps.id_funcionario = f.id_funcionario
      ORDER BY ps.mes_referencia DESC, f.nome
    `);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch salary payments" });
  }
}

export async function createSalaryPayment(req: Request, res: Response) {
  try {
    const {
      id_funcionario,
      mes_referencia,
      valor_salario,
      desconto_inss,
      desconto_ir,
      outras_deducoes,
      observacoes,
    } = req.body;

    const id_pagamento = Math.floor(Math.random() * 1000000);
    const total_deducoes =
      (desconto_inss || 0) + (desconto_ir || 0) + (outras_deducoes || 0);
    const valor_liquido = valor_salario - total_deducoes;

    const query = `
      INSERT INTO pagamentos_salario (
        id_pagamento, id_funcionario, mes_referencia, valor_salario,
        desconto_inss, desconto_ir, outras_deducoes, valor_liquido, observacoes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      id_pagamento,
      id_funcionario,
      mes_referencia,
      valor_salario,
      desconto_inss || 0,
      desconto_ir || 0,
      outras_deducoes || 0,
      valor_liquido,
      observacoes,
    ]);

    res.status(201).json({
      id_pagamento,
      valor_liquido,
      message: "Salary payment created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create salary payment" });
  }
}

export async function processSalaryBatch(req: Request, res: Response) {
  try {
    const { mes_referencia, desconto_inss_percentual, desconto_ir_percentual } =
      req.body;

    // Get all active employees with their salaries
    const employees = await executeQuery(
      "SELECT * FROM funcionarios WHERE status = 'ATIVO'"
    );

    const payments = [];

    for (const emp of employees) {
      if (!emp.salario) continue;

      const id_pagamento = Math.floor(Math.random() * 1000000);
      const desconto_inss = emp.salario * (desconto_inss_percentual / 100);
      const desconto_ir = emp.salario * (desconto_ir_percentual / 100);
      const valor_liquido = emp.salario - desconto_inss - desconto_ir;

      const query = `
        INSERT INTO pagamentos_salario (
          id_pagamento, id_funcionario, mes_referencia, valor_salario,
          desconto_inss, desconto_ir, valor_liquido
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await executeQuery(query, [
        id_pagamento,
        emp.id_funcionario,
        mes_referencia,
        emp.salario,
        desconto_inss,
        desconto_ir,
        valor_liquido,
      ]);

      payments.push({
        id_pagamento,
        funcionario: emp.nome,
        valor_liquido,
      });
    }

    res.status(201).json({
      message: `${payments.length} salary payments created successfully`,
      payments,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process salary batch" });
  }
}

export async function updateSalaryPayment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data_pagamento } = req.body;

    const query = `
      UPDATE pagamentos_salario
      SET status = ?, data_pagamento = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id_pagamento = ?
    `;

    await executeQuery(query, [status, data_pagamento, id]);
    res.json({ message: "Salary payment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update salary payment" });
  }
}

export async function getSalaryReport(req: Request, res: Response) {
  try {
    const { mes_referencia } = req.query;

    let query = `
      SELECT
        COUNT(*) as total_pagamentos,
        COALESCE(SUM(valor_salario), 0) as total_salarios,
        COALESCE(SUM(desconto_inss), 0) as total_inss,
        COALESCE(SUM(desconto_ir), 0) as total_ir,
        COALESCE(SUM(valor_liquido), 0) as total_liquido
      FROM pagamentos_salario
    `;

    if (mes_referencia) {
      query += ` WHERE mes_referencia = ?`;
      const result = await executeQuery(query, [mes_referencia]);
      res.json(result[0]);
    } else {
      const result = await executeQuery(query);
      res.json(result[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch salary report" });
  }
}
