import express from "express";
import * as courseController from "../controllers/courseController.js";

const router = express.Router();

router.get("/", courseController.getCourses);
router.post("/", courseController.createCourse);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);

export default router;
