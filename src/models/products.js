import { Schema, model } from "mongoose";

const nameCollection = 'Producto'


const ProductoSchema = new Schema({
    title: {type:String, required:[true, 'el titulo es obligatorio.']},
    description: {type:String, required:[true, 'la descripcion es obligatoria.']},
    code: {type:String, required:[true, 'el codigo es obligatorio.'], unique:true},
    price:  {type:Number, required:[true, 'el precio es obligatorio.']},
    thumbnail: [{type:String}],
    stock: {type:Number, required:[true, 'el stock es obligatorio.']},
    category: {type:String, required:[true, 'la categoria es obligatoria.']},
    status: {type:Boolean, default: true}
})

export const productModel = model(nameCollection, ProductoSchema)