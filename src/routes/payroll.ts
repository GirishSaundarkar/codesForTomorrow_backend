import { Router } from "express";
import { distributePayroll, payrollHistory } from "../controllers/payroll";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.post("/distribute", authMiddleware(["HR", "ADMIN"]), distributePayroll);
router.get("/history", authMiddleware(["HR", "ADMIN"]), payrollHistory);
export default router;
