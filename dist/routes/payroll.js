"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_1 = require("../controllers/payroll");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/distribute", (0, auth_1.authMiddleware)(["HR", "ADMIN"]), payroll_1.distributePayroll);
router.get("/history", (0, auth_1.authMiddleware)(["HR", "ADMIN"]), payroll_1.payrollHistory);
exports.default = router;
//# sourceMappingURL=payroll.js.map