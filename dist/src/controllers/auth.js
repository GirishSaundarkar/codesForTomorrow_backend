"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const prisma_1 = require("../prisma");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        return res.status(400).json({ error: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Login successful", role: user.role });
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map