import { Request, Response } from "express";
export declare const calculateEmployeeSalary: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSalarySlip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
