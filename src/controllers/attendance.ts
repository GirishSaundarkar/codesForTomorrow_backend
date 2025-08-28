import { Request, Response } from "express";
import prisma from "../prisma";

export const markAttendance = async (req: Request, res: Response) => {
  const { employeeId, date, hoursWorked } = req.body;
  const attendance = await prisma.attendance.create({
    data: { employeeId, date: new Date(date), hoursWorked },
  });
  res.json(attendance);
};
