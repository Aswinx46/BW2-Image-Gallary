import mongoose from "mongoose"

export class ConnectMongo {
    private databaseUrl: string
    constructor() {
        if (process.env.MONGODB) {
            this.databaseUrl = process.env.MONGODB
        } else {
            throw new Error('No mongodb url found for database connection')
        }
    }
    connectDb() {
        mongoose.connect(this.databaseUrl).then(() => console.log('DB connected')).catch((error) => console.log(error))
    }
}