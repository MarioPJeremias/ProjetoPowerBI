import express from "express";
import * as classController from "../controllers/classController.js";

const router = express.Router();

router.get("/", classController.getClasses);
router.post("/", classController.createClass);
router.put("/:id", classController.updateClass);
router.post("/:classId/enroll", classController.enrollStudent);
router.get("/:classId/enrollments", classController.getClassEnrollments);

export default router;
