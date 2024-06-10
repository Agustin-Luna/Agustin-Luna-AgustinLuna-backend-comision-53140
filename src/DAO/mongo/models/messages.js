import { Schema, model } from "mongoose";

const nameCollection = 'Message'


const MessageSchema = new Schema({
    user: {type:String, required:[true,'el usuario es obligatorio.']},
    message:{type:String, required:[true,'el mensaje es obligatorio.']}
})

export const messageModel = model(nameCollection, MessageSchema)