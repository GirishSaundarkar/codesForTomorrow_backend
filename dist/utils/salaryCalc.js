"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSalary = calculateSalary;
function calculateSalary(basic, hra, allowance, deductions, attendances, workingDays) {
    const grossSalaray = basic + hra + allowance;
    const pf = basic * 0.12;
    let tax = 0;
    if (grossSalaray > 50000) {
        tax = grossSalaray * 0.2;
    }
    else if (grossSalaray > 30000) {
        tax = grossSalaray * 0.1;
    }
    const dailyWage = grossSalaray / workingDays;
    let fullDays = 0, halfDays = 0;
    attendances.forEach((a) => {
        if (a.hoursWorked >= 8) {
            fullDays++;
        }
        else if (a.hoursWorked >= 4) {
            halfDays++;
        }
    });
    const totalSalary = fullDays * dailyWage + halfDays * (dailyWage / 2);
    const netSalary = totalSalary - tax - pf - deductions;
    return {
        grossSalary: grossSalaray,
        pf,
        tax,
        deductions,
        netSalary,
    };
}
//# sourceMappingURL=salaryCalc.js.map