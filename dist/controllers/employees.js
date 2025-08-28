"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployee = exports.createEmployee = void 0;
const prisma_1 = require("../prisma");
const createEmployee = async (req, res) => {
    const { userId, basicSalary, hra, allowances, deductions } = req.body;
    const employee = await prisma_1.default.employee.create({
        data: { userId, basicSalary, hra, allowances, deductions },
    });
    res.json(employee);
};
exports.createEmployee = createEmployee;
const getEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await prisma_1.default.employee.findUnique({
        where: { id: Number(id) },
        include: { user: true },
    });
    if (!employee)
        return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
};
exports.getEmployee = getEmployee;
//# sourceMappingURL=employees.js.map