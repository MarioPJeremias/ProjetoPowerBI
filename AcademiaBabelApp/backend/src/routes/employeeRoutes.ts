import express from "express";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", employeeController.getEmployees);
router.post("/", employeeController.createEmployee);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);

export default router;
