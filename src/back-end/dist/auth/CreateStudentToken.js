"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInStudent = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./src/.env" });
const client_db_1 = require("../database/client-db");
const jsonwebtoken_1 = require("jsonwebtoken");
// import { setRedis } from "../redisConfig";
const signInStudent = async (req, res) => {
    try {
        const { student_id } = req.body;
        const student = await fetchStudent(student_id);
        const students_id = await student.rows[0].student_id;
        const access_number = (await fetchStudent(student_id)).rows[0].access;
        const student_role = await fetchStudentAccess(students_id);
        const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
        if (!MY_SECRET_KEY) {
            throw new Error("Chave Secreta não fornecida!");
        }
        console.log(student_role.rows[0]);
        const token = (0, jsonwebtoken_1.sign)({
            userid: students_id,
            userRole: student_role.rows[0],
            access: access_number
        }, MY_SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "1h"
        });
        // await setRedis(student_id, JSON.stringify(student))
        res.json(token);
    }
    catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
    async function fetchStudent(id) {
        const result = await client_db_1.db.query('SELECT * FROM students WHERE student_id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error("student's informations not found");
        }
        return result;
    }
    async function fetchStudentAccess(Accessid) {
        const result = await client_db_1.db.query('SELECT role FROM School_Access WHERE School_Access_id = $1', [Accessid]);
        if (result.rows.length === 0) {
            throw new Error("student's Access informations not found");
        }
        return result;
    }
};
exports.signInStudent = signInStudent;
