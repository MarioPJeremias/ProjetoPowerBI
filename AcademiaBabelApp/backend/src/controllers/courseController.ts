import { Request, Response } from "express";
import { executeQuery } from "../db/databricks.js";

export async function getCourses(req: Request, res: Response) {
  try {
    const courses = await executeQuery("SELECT * FROM cursos ORDER BY nome_curso");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const { nome_curso, descricao, duracao_horas, valor_curso } = req.body;
    const id_curso = Math.floor(Math.random() * 1000000);

    const query = `
      INSERT INTO cursos (id_curso, nome_curso, descricao, duracao_horas, valor_curso)
      VALUES (?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      id_curso,
      nome_curso,
      descricao,
      duracao_horas,
      valor_curso,
    ]);

    res.status(201).json({
      id_curso,
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    let query = "UPDATE cursos SET updated_at = CURRENT_TIMESTAMP";
    const params: any[] = [];

    for (const [key, value] of Object.entries(updates)) {
      query += `, ${key} = ?`;
      params.push(value);
    }

    query += " WHERE id_curso = ?";
    params.push(id);

    await executeQuery(query, params);
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const course = await executeQuery("SELECT * FROM cursos WHERE id_curso = ?", [id]);
    if (course.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
}
