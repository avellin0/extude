"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotes = void 0;
const client_db_1 = require("../database/client-db");
class CreateNotes {
    async handle(req, res) {
        const { user_id, content_text } = req.body;
        console.log({ user_id, content_text });
        if (!user_id || !content_text) {
            return res.status(400).send('Todos os campos são obrigatorios');
        }
        const user = await client_db_1.db.query('INSERT INTO notes(note_id,user_id,content) VALUES (uuid_generate_v4(),$1,$2)', [user_id, content_text]);
        res.status(200).json({ menssage: "notes were saved!" });
    }
}
exports.CreateNotes = CreateNotes;
