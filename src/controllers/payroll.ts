import { Request, Response } from "express";
import prisma from "../prisma";
import { calculateSalary } from "../utils/salaryCalc";

export const distributePayroll = async (req: Request, res: Response) => {
  const { month, workingDays } = req.body;

  const employees = await prisma.employee.findMany({
    include: { attendances: true },
  });

  const salaries = await Promise.all(
    employees.map((e: { attendances: any[]; basicSalary: number; hra: number; allowances: number; deductions: number; id: any; }) => {
      const monthAttendances = e.attendances.filter((a: { date: { toISOString: () => string; }; }) =>
        a.date.toISOString().startsWith(month)
      );
      const result = calculateSalary(
        e.basicSalary,
        e.hra,
        e.allowances,
        e.deductions,
        monthAttendances,
        workingDays
      );
      return prisma.salary.create({
        data: { employeeId: e.id, month, ...result },
      });
    })
  );

  res.json({ message: "Payroll distributed", count: salaries.length });
};

export const payrollHistory = async (req: Request, res: Response) => {
  const { month } = req.query;
  const salaries = await prisma.salary.findMany({
    where: { month: String(month) },
  });

  const totalPayout = salaries.reduce((sum: any, s: { netSalary: any; }) => sum + s.netSalary, 0);

  res.json({ month, totalPayout, employeeCount: salaries.length });
};
