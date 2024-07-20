import express from 'express'
import { ServerProtocol } from "../interfaces/Adapter-Server-Protocol";
import { route } from '../routes/routes';
import cors from 'cors'
import bodyParser from 'body-parser'

export class AdapterServer implements ServerProtocol {
 isRunning() {
        const app = express()

        app.use(cors())
        app.use(bodyParser.urlencoded({extended: true}))

        app.use(express.json())
        app.use(route)
        
         app.listen(3000, () => {
            console.log('server is running...');
        })
    }
}

const server = new AdapterServer()
server.isRunning()