import express from "express";
import * as studentController from "../controllers/studentController.js";

const router = express.Router();

router.get("/", studentController.getStudents);
router.post("/", studentController.createStudent);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);

export default router;
