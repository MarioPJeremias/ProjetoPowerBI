import { Request, Response } from "express";
import { executeQuery } from "../db/databricks.js";

export async function getClasses(req: Request, res: Response) {
  try {
    const classes = await executeQuery(`
      SELECT t.*, c.nome_curso
      FROM turmas t
      LEFT JOIN cursos c ON t.id_curso = c.id_curso
      ORDER BY t.data_inicio DESC
    `);
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
}

export async function createClass(req: Request, res: Response) {
  try {
    const {
      id_curso,
      id_instrutor,
      nome_turma,
      data_inicio,
      data_fim,
      capacidade_maxima,
    } = req.body;
    const id_turma = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO turmas (
        id_turma, id_curso, id_instrutor, nome_turma,
        data_inicio, data_fim, capacidade_maxima
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      id_turma,
      id_curso,
      id_instrutor,
      nome_turma,
      data_inicio,
      data_fim,
      capacidade_maxima,
    ]);

    res.status(201).json({
      id_turma,
      message: "Class created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create class" });
  }
}

export async function enrollStudent(req: Request, res: Response) {
  try {
    const { id_aluno, id_turma } = req.body;
    const id_inscricao = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO inscricoes (
        id_inscricao, id_aluno, id_turma, data_inscricao
      ) VALUES (?, ?, ?, CURRENT_DATE())
    `;

    await executeQuery(query, [id_inscricao, id_aluno, id_turma]);

    // Update class enrollment count
    await executeQuery(
      "UPDATE turmas SET numero_alunos = numero_alunos + 1 WHERE id_turma = ?",
      [id_turma]
    );

    res.status(201).json({
      id_inscricao,
      message: "Student enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to enroll student" });
  }
}

export async function getClassEnrollments(req: Request, res: Response) {
  try {
    const { classId } = req.params;
    const enrollments = await executeQuery(`
      SELECT i.*, a.nome, a.sobrenome, a.email
      FROM inscricoes i
      JOIN alunos a ON i.id_aluno = a.id_aluno
      WHERE i.id_turma = ?
      ORDER BY a.nome
    `, [classId]);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
}

export async function updateClass(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    let query = "UPDATE turmas SET updated_at = CURRENT_TIMESTAMP";
    const params: any[] = [];

    for (const [key, value] of Object.entries(updates)) {
      query += `, ${key} = ?`;
      params.push(value);
    }

    query += " WHERE id_turma = ?";
    params.push(id);

    await executeQuery(query, params);
    res.json({ message: "Class updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update class" });
  }
}
