"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapterServer = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes/routes");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
class AdapterServer {
    isRunning() {
        try {
            const app = (0, express_1.default)();
            app.use((0, cors_1.default)());
            app.use(express_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(routes_1.route);
            app.listen(3000, () => {
                console.log('Server is running on port 3000...');
            });
        }
        catch (error) {
            console.error('Failed to start server:', error);
        }
    }
}
exports.AdapterServer = AdapterServer;
const server = new AdapterServer();
