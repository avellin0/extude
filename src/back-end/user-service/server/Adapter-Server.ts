import express from 'express'
import { ServerProtocol } from "./Adapter-Server-Protocol";
import { route } from '../src/routes/routes';
import cors from 'cors'
import bodyParser from 'body-parser'


export class AdapterServer implements ServerProtocol {
 isRunning() {
    try {
        const app = express();

        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(route);

        app.listen(3000, () => {
            console.log('Server is running on port 3000...');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
    }
}

const server = new AdapterServer()
