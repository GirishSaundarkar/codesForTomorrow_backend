"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salary_1 = require("../controllers/salary");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/calculate", (0, auth_1.authMiddleware)(["HR", "ADMIN"]), salary_1.calculateEmployeeSalary);
router.get("/:employeeId", (0, auth_1.authMiddleware)(["HR", "ADMIN", "EMPLOYEE"]), salary_1.getSalarySlip);
exports.default = router;
//# sourceMappingURL=salary.js.map