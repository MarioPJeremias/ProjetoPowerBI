import { Request, Response } from "express";
import { executeQuery } from "../db/databricks.js";

export async function getEmployees(req: Request, res: Response) {
  try {
    const employees = await executeQuery("SELECT * FROM funcionarios ORDER BY nome");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
}

export async function createEmployee(req: Request, res: Response) {
  try {
    const {
      nome,
      sobrenome,
      data_nascimento,
      genero,
      estado,
      email,
      telefone,
      salario,
    } = req.body;

    const id_funcionario = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO funcionarios (
        id_funcionario, nome, sobrenome, data_nascimento, genero,
        estado, email, telefone, salario, data_contratacao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE())
    `;

    await executeQuery(query, [
      id_funcionario,
      nome,
      sobrenome,
      data_nascimento,
      genero,
      estado,
      email,
      telefone,
      salario,
    ]);

    res.status(201).json({
      id_funcionario,
      message: "Employee created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
}

export async function updateEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    let query = "UPDATE funcionarios SET updated_at = CURRENT_TIMESTAMP";
    const params: any[] = [];

    for (const [key, value] of Object.entries(updates)) {
      query += `, ${key} = ?`;
      params.push(value);
    }

    query += " WHERE id_funcionario = ?";
    params.push(id);

    await executeQuery(query, params);
    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
}

export async function getEmployeeById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const employee = await executeQuery(
      "SELECT * FROM funcionarios WHERE id_funcionario = ?",
      [id]
    );
    if (employee.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
}
