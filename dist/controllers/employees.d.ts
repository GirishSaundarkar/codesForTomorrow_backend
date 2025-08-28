import { Request, Response } from "express";
export declare const createEmployee: (req: Request, res: Response) => Promise<void>;
export declare const getEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
