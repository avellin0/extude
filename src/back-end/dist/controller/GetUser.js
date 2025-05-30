"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const client_db_1 = require("../database/client-db");
class GetUser {
    async handle(req, res) {
        const { id } = req.body;
        if (typeof (id) !== "string") {
            console.log("o id não é uma string");
            console.log("Esse é o id:", typeof (id));
        }
        const getUserInfo = await client_db_1.db.query("SELECT name FROM Usuario WHERE userid = $1", [id]);
        console.log(getUserInfo.rows);
        res.status(200).send(getUserInfo.rows);
    }
}
exports.GetUser = GetUser;
