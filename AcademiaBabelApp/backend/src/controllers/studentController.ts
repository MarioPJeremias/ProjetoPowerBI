import { Request, Response } from "express";
import { executeQuery } from "../db/databricks.js";
import { v4 as uuidv4 } from "uuid";

export async function getStudents(req: Request, res: Response) {
  try {
    const students = await executeQuery("SELECT * FROM alunos ORDER BY nome");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
}

export async function createStudent(req: Request, res: Response) {
  try {
    const {
      nome,
      sobrenome,
      data_nascimento,
      genero,
      estado,
      email,
      telefone,
    } = req.body;

    const id_aluno = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO alunos (
        id_aluno, nome, sobrenome, data_nascimento, genero,
        data_inscricao, estado, email, telefone
      ) VALUES (?, ?, ?, ?, ?, CURRENT_DATE(), ?, ?, ?)
    `;

    await executeQuery(query, [
      id_aluno,
      nome,
      sobrenome,
      data_nascimento,
      genero,
      estado,
      email,
      telefone,
    ]);

    res.status(201).json({
      id_aluno,
      message: "Student created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    let query = "UPDATE alunos SET updated_at = CURRENT_TIMESTAMP";
    const params: any[] = [];

    for (const [key, value] of Object.entries(updates)) {
      query += `, ${key} = ?`;
      params.push(value);
    }

    query += " WHERE id_aluno = ?";
    params.push(id);

    await executeQuery(query, params);
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
}

export async function getStudentById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const student = await executeQuery("SELECT * FROM alunos WHERE id_aluno = ?", [
      id,
    ]);
    if (student.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
}
