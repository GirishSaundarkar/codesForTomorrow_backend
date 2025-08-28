"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalarySlip = exports.calculateEmployeeSalary = void 0;
const prisma_1 = require("../prisma");
const salaryCalc_1 = require("../utils/salaryCalc");
const calculateEmployeeSalary = async (req, res) => {
    const { employeeId, month, workingDays } = req.body;
    const employee = await prisma_1.default.employee.findUnique({
        where: { id: Number(employeeId) },
        include: { attendances: true },
    });
    if (!employee)
        return res.status(404).json({ error: "Employee not found" });
    const monthAttendances = employee.attendances.filter((a) => a.date.toISOString().startsWith(month));
    const result = (0, salaryCalc_1.calculateSalary)(employee.basicSalary, employee.hra, employee.allowances, employee.deductions, monthAttendances, workingDays);
    const salary = await prisma_1.default.salary.create({
        data: Object.assign({ employeeId: employee.id, month }, result),
    });
    res.json({ salary, breakdown: result });
};
exports.calculateEmployeeSalary = calculateEmployeeSalary;
const getSalarySlip = async (req, res) => {
    const { employeeId } = req.params;
    const { month } = req.query;
    const salary = await prisma_1.default.salary.findFirst({
        where: { employeeId: Number(employeeId), month: String(month) },
    });
    if (!salary)
        return res.status(404).json({ error: "No salary record" });
    res.json(salary);
};
exports.getSalarySlip = getSalarySlip;
//# sourceMappingURL=salary.js.map