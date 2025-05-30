"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const db = new pg_1.Client({
    user: process.env.USER,
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE,
    password: process.env.PASS
});
exports.db = db;
db.connect();
