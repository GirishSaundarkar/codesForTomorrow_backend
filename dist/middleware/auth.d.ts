import { Request, Response, NextFunction } from "express";
export interface AuthUser {
    id: number;
    role: "HR" | "ADMIN" | "EMPLOYEE";
}
export declare const authMiddleware: (roles?: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
