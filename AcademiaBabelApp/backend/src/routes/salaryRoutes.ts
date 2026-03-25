import express from "express";
import * as salaryController from "../controllers/salaryController.js";

const router = express.Router();

router.get("/", salaryController.getSalaryPayments);
router.post("/", salaryController.createSalaryPayment);
router.post("/batch", salaryController.processSalaryBatch);
router.put("/:id", salaryController.updateSalaryPayment);
router.get("/report", salaryController.getSalaryReport);

export default router;
