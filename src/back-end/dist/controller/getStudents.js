"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudents = void 0;
const client_db_1 = require("../database/client-db");
class GetStudents {
    async handle(req, res) {
        const { email } = req.body;
        console.time();
        const alreadyHaveAccount = await client_db_1.db.query('SELECT * FROM Usuario WHERE email = $1', [email]);
        if (alreadyHaveAccount.rows.length > 0) {
            console.log('Email já registrado');
            return res.send('Usuario ja  existe');
        }
        console.timeEnd();
        res.status(500).send("Tudo certo");
    }
}
exports.GetStudents = GetStudents;
