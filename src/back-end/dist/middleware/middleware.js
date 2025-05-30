"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "Users/plogl/Lessons/Projects/SchoolSchedule/src/.env" });
const client_db_1 = require("../database/client-db");
const jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(permissions) {
    return async (req, res, next) => {
        const authheader = req.headers.authorization;
        if (!authheader || !authheader.startsWith('Bearer ')) {
            return res.status(500).json({ message: "token não informado" });
        }
        const token = authheader.substring(7);
        try {
            const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
            if (!MY_SECRET_KEY) {
                return res.status(500).json({ message: "chave secreta não informada" });
            }
            const decoded = (0, jsonwebtoken_1.verify)(token, MY_SECRET_KEY);
            const access = await fetchTeachersAccess(decoded.userid);
            const access_name = await fetchSchoolAccessName(decoded.access);
            const userPermissions = access_name.rows[0].role;
            const hasPermissions = permissions?.some((p) => userPermissions.includes(p));
            if (!hasPermissions) {
                return res.status(403).json({ message: "permissão negada." });
            }
            return next();
        }
        catch (error) {
            res.status(401).json({ message: "deu merda!" });
        }
        async function fetchTeachersAccess(id) {
            const result = await client_db_1.db.query('SELECT access FROM teachers WHERE teacher_id = $1', [id]);
            if (result.rows.length === 0) {
                throw new Error("Teacher's informations not found");
            }
            return result;
        }
        async function fetchStudentsAccess(id) {
            const result = await client_db_1.db.query('SELECT access FROM students WHERE student_id = $1', [id]);
            if (result.rows.length === 0) {
                throw new Error("Teacher's informations not found");
            }
            return result;
        }
        async function fetchSchoolAccessName(Accessid) {
            const result = await client_db_1.db.query('SELECT role FROM School_Access WHERE School_Access_id = $1', [Accessid]);
            if (result.rows.length === 0) {
                throw new Error("Teacher's informations not found");
            }
            return result;
        }
    };
}
