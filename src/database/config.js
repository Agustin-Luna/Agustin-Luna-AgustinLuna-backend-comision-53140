import mongoose from "mongoose";


export const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://agustinluna:Riverplate01@cluster0.hsbubgh.mongodb.net/ecommerce')
    console.log('la base esta en linea')
    } catch (error) {
        console.log(`error al usar la base de datos. ${error}`)
        process.exit(1)
    }
}  
// mongodb+srv://agustinluna:Riverplate01@cluster0.hsbubgh.mongodb.net/ecommerce