import { request, response } from "express";
import { productModel } from "../models/products.js";



export const getProducts = async(req, res) =>{
    try {
        const { limit } = req.query;
        const productos = await productModel.find().limit(Number(limit))
        return res.json({productos});
    } catch (error) {
        console.log('getProducts -> ', error)
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}

export const getProductById = async(req, res) =>{
    try {
        const { pid } = req.params
        const producto = await productModel.findById(pid)
        if(!producto)
            return res.status(404).json({msg:`el producto con id ${id} no existe.`});
        return res.json({producto});
    } catch (error) {
        console.log('getProductById -> ', error)
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}

export const addProducts = async(req, res) =>{
    try {
        const {title, description, price, thumbnail, code, stock, category,status} = req.body

        if(!title,  !description,  !price,  !thumbnail,  !code,  !stock,  !category, !status)
            return res.status(404).json({msg:'los campos [title, description, price, thumbnail, code, stock, category,status] son obligatorios'});
        
        const producto = await productModel.create({title, description, price, thumbnail, code, stock, category,status})
        return res.json({producto})
    } catch (error) {
        console.log('addProducts -> ', error)
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}

export const updateProduct = async(req, res) =>{
    try {
        const { pid } = req.params;
        const {_id,...rest} = req.body
        const producto = await productModel.findByIdAndUpdate(pid, {...rest}, {new:true})
        if(producto)
            return res.json({msg:'producto actualizado', producto})
        return res.status(404).json({msg: `no se pudo actualizar el producto con id ${pid}`})
    } catch (error) {
        console.log('updateProduct -> ', error)
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}


export const deleteProduct = async(req, res) =>{
    try {
        const { pid } = req.params;
        const producto = await productModel.findByIdAndDelete(pid)
        if(producto)
            return res.json({msg:'producto eliminado', producto})
        return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        console.log('deleteProduct -> ', error)
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}