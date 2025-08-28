"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_1 = require("../controllers/employees");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.authMiddleware)(["HR", "ADMIN"]), employees_1.createEmployee);
router.get("/:id", (0, auth_1.authMiddleware)(["HR", "ADMIN", "EMPLOYEE"]), employees_1.getEmployee);
exports.default = router;
//# sourceMappingURL=employees.js.map