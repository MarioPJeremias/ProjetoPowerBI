import express from "express";
import * as financialController from "../controllers/financialController.js";

const router = express.Router();

// Revenue routes
router.get("/revenues", financialController.getRevenues);
router.post("/revenues", financialController.createRevenue);

// Expense routes
router.get("/expenses", financialController.getExpenses);
router.post("/expenses", financialController.createExpense);

// Summary
router.get("/summary", financialController.getFinancialSummary);

export default router;
