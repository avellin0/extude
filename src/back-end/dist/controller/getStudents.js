"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudents = void 0;
const client_db_1 = require("../database/client-db");
class GetStudents {
    async handle(req, res) {
        const { email } = req.body;
        console.time();
        const alreadyHaveAccount = await client_db_1.db.query('SELECT * FROM Usuario WHERE email = $1', [email]);
        if (alreadyHaveAccount.rows.length < 0) {
            console.log('Usuario não encontrado');
            res.status(404).json("usuario não encontrado");
        }
        res.status(200).send(alreadyHaveAccount.rows);
    }
}
exports.GetStudents = GetStudents;
