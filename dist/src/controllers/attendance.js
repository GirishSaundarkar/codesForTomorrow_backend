"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAttendance = void 0;
const prisma_1 = require("../prisma");
const markAttendance = async (req, res) => {
    const { employeeId, date, hoursWorked } = req.body;
    const attendance = await prisma_1.default.attendance.create({
        data: { employeeId, date: new Date(date), hoursWorked },
    });
    res.json(attendance);
};
exports.markAttendance = markAttendance;
//# sourceMappingURL=attendance.js.map