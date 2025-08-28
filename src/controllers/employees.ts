import { Request, Response } from "express";
import prisma from "../prisma";

export const createEmployee = async (req: Request, res: Response) => {
  const { userId, basicSalary, hra, allowances, deductions } = req.body;
  const employee = await prisma.employee.create({
    data: { userId, basicSalary, hra, allowances, deductions },
  });
  res.json(employee);
};

export const getEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json(employee);
};
