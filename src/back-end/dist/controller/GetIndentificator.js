"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetId = void 0;
const client_db_1 = require("../database/client-db");
class GetId {
    async handle(req, res) {
        const { email } = req.params;
        const research = await client_db_1.db.query('SELECT userid FROM usuario WHERE email = $1', [email]);
        // SELECT  usuario.userId, notes.content FROM usuario INNER JOIN notes ON usuario.userid = notes.user_id
        console.log(research.rows);
        res.send(research.rows);
    }
}
exports.GetId = GetId;
