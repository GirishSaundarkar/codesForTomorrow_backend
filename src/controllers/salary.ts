import { Request, Response } from "express";
import prisma from "../prisma";
import { calculateSalary } from "../utils/salaryCalc";

export const calculateEmployeeSalary = async (req: Request, res: Response) => {
  const { employeeId, month, workingDays } = req.body;
  const employee = await prisma.employee.findUnique({
    where: { id: Number(employeeId) },
    include: { attendances: true },
  });
  if (!employee) return res.status(404).json({ error: "Employee not found" });

  const monthAttendances = employee.attendances.filter((a: { date: { toISOString: () => string; }; }) =>
    a.date.toISOString().startsWith(month)
  );

  const result = calculateSalary(
    employee.basicSalary,
    employee.hra,
    employee.allowances,
    employee.deductions,
    monthAttendances,
    workingDays
  );

  const salary = await prisma.salary.create({
    data: { employeeId: employee.id, month, ...result },
  });

  res.json({ salary, breakdown: result });
};

export const getSalarySlip = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  const { month } = req.query;

  const salary = await prisma.salary.findFirst({
    where: { employeeId: Number(employeeId), month: String(month) },
  });
  if (!salary) return res.status(404).json({ error: "No salary record" });

  res.json(salary);
};
