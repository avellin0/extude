    import cors from 'cors'
    import bodyParser from 'body-parser'
    import express from 'express'
    import { ServerProtocol } from '../interfaces/Adapter-Server-Protocol'
    import {rota} from '../routes/routes'

    export class AdapterServer implements ServerProtocol {
        isRunning(): void {
            const app = express()
        
            
            app.use(cors())
            app.use(bodyParser.urlencoded({extended: true}))

            app.use(express.json())
            app.use(rota)

            app.listen(3000, () => {
                console.log('Server done');
            })
        }
    }

    const server = new AdapterServer()
    server.isRunning()