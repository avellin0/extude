"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLastSave = void 0;
const client_db_1 = require("../database/client-db");
class GetLastSave {
    async handle(req, res) {
        const { id } = req.params;
        const research = await client_db_1.db.query("SELECT MAX(date) AS last_date FROM notes WHERE user_id = $1;", [id]);
        console.log(research.rows[0].last_date);
        const LatestDate = research.rows[0].last_date;
        console.log(`${LatestDate}'`);
        const LatestNote = await client_db_1.db.query("SELECT content FROM notes WHERE user_id = $1 ", [id]);
        console.log(LatestNote.rows);
        res.status(200).send(LatestNote.rows[LatestNote.rows.length - 1]);
    }
}
exports.GetLastSave = GetLastSave;
