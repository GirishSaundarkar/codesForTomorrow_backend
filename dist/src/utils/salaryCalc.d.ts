export declare function calculateSalary(basic: number, hra: number, allowance: number, deductions: number, attendances: {
    hoursWorked: number;
}[], workingDays: number): {
    grossSalary: number;
    pf: number;
    tax: number;
    deductions: number;
    netSalary: number;
};
