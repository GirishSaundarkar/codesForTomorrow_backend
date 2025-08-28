import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import employeeRoutes from "./routes/employees";
import attendanceRoutes from "./routes/attendance";
import salaryRoutes from "./routes/salary";
import payrollRoutes from "./routes/payroll";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/salary", salaryRoutes);
app.use("/payroll", payrollRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
