"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllInfo = void 0;
const client_db_1 = require("../database/client-db");
class AllInfo {
    async handle(req, res) {
        const { username } = req.body;
        const response = await client_db_1.db.query('SELECT * FROM Usuario WHERE name = $1', [username]);
        res.status(200).json(response.rows);
    }
}
exports.AllInfo = AllInfo;
