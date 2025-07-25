"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const crypto_1 = require("crypto");
const client_db_1 = require("../database/client-db");
class CreateUser {
    async handle(req, res) {
        const { name, email, password, permissions } = req.body;
        console.log(name, email, password, permissions);
        if (!name || !email || !password || !permissions) {
            return res.status(400).send('Todos os campos são obrigatorios');
        }
        const Hash = (0, crypto_1.createHash)('sha256').update(password).digest('hex');
        try {
            const alreadyHaveAccount = await client_db_1.db.query('SELECT * FROM Usuario WHERE email = $1', [email]);
            if (alreadyHaveAccount.rows.length > 0) {
                console.log('Email já registrado');
                return res.send('Usuario ja  existe');
            }
            const create = await client_db_1.db.query('INSERT INTO Usuario(userId,name,email,password,permission) VALUES(uuid_generate_v4(),$1,$2,$3,$4)', [name, email, Hash, permissions]);
            res.status(201).json({ message: 'User created successfully', data: create.rows });
        }
        catch (err) {
            console.log("esse é o erro:", err);
            res.status(404).send('Erro interno');
        }
    }
}
exports.CreateUser = CreateUser;
