"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFriends = void 0;
const client_db_1 = require("../database/client-db");
class GetFriends {
    async handle(req, res) {
        const { id } = req.body;
        console.log("This is the user_id:", id);
        const research = await client_db_1.db.query('SELECT Usuario.name From Usuario INNER JOIN user_friends ON user_friends.friend_id = Usuario.userId WHERE user_friends.user_id = $1', [id]);
        res.status(200).send(research.rows);
    }
}
exports.GetFriends = GetFriends;
