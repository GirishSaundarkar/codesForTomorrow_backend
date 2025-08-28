"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_1 = require("../controllers/attendance");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/mark", (0, auth_1.authMiddleware)(["EMPLOYEE"]), attendance_1.markAttendance);
exports.default = router;
//# sourceMappingURL=attendance.js.map