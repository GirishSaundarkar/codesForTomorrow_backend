import { Router } from "express";
import { markAttendance } from "../controllers/attendance";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.post("/mark", authMiddleware(["EMPLOYEE"]), markAttendance);
export default router;
