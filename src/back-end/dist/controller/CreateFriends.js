"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFriends = void 0;
const client_db_1 = require("../database/client-db");
class CreateFriends {
    async handle(req, res) {
        const { friendOf, id } = req.body;
        console.log("It's that info received:", friendOf, id);
        const create = await client_db_1.db.query('INSERT INTO user_friends(user_id, friend_id) VALUES ($1, $2)', [friendOf, id]);
        res.status(200).send(create.rows);
    }
}
exports.CreateFriends = CreateFriends;
