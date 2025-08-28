import { Router } from "express";
import { createEmployee, getEmployee } from "../controllers/employees";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.post("/", authMiddleware(["HR", "ADMIN"]), createEmployee);
router.get("/:id", authMiddleware(["HR", "ADMIN", "EMPLOYEE"]), getEmployee);
export default router;
