import mongoose from "mongoose";
import 'dotenv/config'


export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.URI_MONGO_DB)
    console.log('la base esta en linea')
    } catch (error) {
        console.log(`error al usar la base de datos. ${error}`)
        process.exit(1)
    }
}  
