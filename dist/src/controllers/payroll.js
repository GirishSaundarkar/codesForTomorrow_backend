"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payrollHistory = exports.distributePayroll = void 0;
const prisma_1 = require("../prisma");
const salaryCalc_1 = require("../utils/salaryCalc");
const distributePayroll = async (req, res) => {
    const { month, workingDays } = req.body;
    const employees = await prisma_1.default.employee.findMany({
        include: { attendances: true },
    });
    const salaries = await Promise.all(employees.map((e) => {
        const monthAttendances = e.attendances.filter((a) => a.date.toISOString().startsWith(month));
        const result = (0, salaryCalc_1.calculateSalary)(e.basicSalary, e.hra, e.allowances, e.deductions, monthAttendances, workingDays);
        return prisma_1.default.salary.create({
            data: Object.assign({ employeeId: e.id, month }, result),
        });
    }));
    res.json({ message: "Payroll distributed", count: salaries.length });
};
exports.distributePayroll = distributePayroll;
const payrollHistory = async (req, res) => {
    const { month } = req.query;
    const salaries = await prisma_1.default.salary.findMany({
        where: { month: String(month) },
    });
    const totalPayout = salaries.reduce((sum, s) => sum + s.netSalary, 0);
    res.json({ month, totalPayout, employeeCount: salaries.length });
};
exports.payrollHistory = payrollHistory;
//# sourceMappingURL=payroll.js.map