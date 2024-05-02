import mongoose, { mongo } from "mongoose";


export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.URL_MONGO_DB)
    console.log('la base esta en linea')
    } catch (error) {
        console.log(`error al usar la base de datos. ${error}`)
        process.exti(1)
    }
} 