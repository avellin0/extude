"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const client_db_1 = require("../database/client-db");
class Students {
    userid;
    name;
    email;
    password;
    permission;
    constructor(userid, name, email, password, permission) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.permission = permission;
    }
    async createStudents(id, name, email, password, permission) {
        const HashPassword = node_crypto_1.default.createHash('sha256').update(password).digest('hex');
        const addStudents = await client_db_1.db.query('INSERT INTO Usuario(userId,name,email,password,permission) VALUES($1,$2,$3,$4,$5)', [id, name, email, HashPassword, permission]);
        return addStudents;
    }
    async infoStudent() {
        return new Promise((resolve) => {
            resolve([
                {
                    userid: this.userid,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    permission: this.permission
                }
            ]);
        });
    }
    ;
}
exports.Students = Students;
;
