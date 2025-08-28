import { Router } from "express";
import { calculateEmployeeSalary, getSalarySlip } from "../controllers/salary";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.post(
  "/calculate",
  authMiddleware(["HR", "ADMIN"]),
  calculateEmployeeSalary
);
router.get(
  "/:employeeId",
  authMiddleware(["HR", "ADMIN", "EMPLOYEE"]),
  getSalarySlip
);
export default router;
