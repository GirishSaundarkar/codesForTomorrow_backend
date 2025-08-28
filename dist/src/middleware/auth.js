"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token)
                return res.status(401).json({ error: "Not authenticated" });
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ error: "Forbidden" });
            }
            next();
        }
        catch (err) {
            res.status(401).json({ error: "Invalid token" });
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map