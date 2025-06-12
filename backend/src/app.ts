import express, { Express, urlencoded } from 'express'
import dotenv from 'dotenv'
import { ConnectMongo } from './framework/database/databaseConnection/connectMongo'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
import morgan from 'morgan'
import { UserRoute } from './framework/routes/userRoutes'
export class App {
    private app: Express
    private database: ConnectMongo
    constructor() {
        dotenv.config()
        this.app = express()
        this.database = new ConnectMongo()
        this.connectDatabase()
        this.setMiddlewares()
        this.setUseRoute()
    }
    private setMiddlewares() {
        this.app.use(cors({
            origin: process.env.ORIGIN,
            credentials: true
        }))
        this.app.use(cookie_parser())
        this.app.use(express.json())
        this.app.use(urlencoded({ extended: true }))
        this.app.use(morgan('dev'))
    }
    private connectDatabase() {
        this.database.connectDb()
    }
    private setUseRoute() {
        this.app.use('/', new UserRoute().userRouter)
    }
    public listen() {
        const port = process.env.PORT || 3000
        this.app.listen(port, () => console.log('server connected'))
    }
}

const app = new App()
app.listen()