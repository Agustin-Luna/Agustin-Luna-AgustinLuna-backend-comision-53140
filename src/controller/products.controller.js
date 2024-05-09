import { request, response } from "express";
import { addProductsService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services/products.services.js";



export const getProducts = async(req, res) =>{
    try {
        const result = await getProductsService({...req.query})
        return res.json({result});
    } catch (error) {
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}

export const getProductById = async(req, res) =>{
    try {
        const { pid } = req.params
        const producto = await getProductByIdService(pid)
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
        const {title, description, price, code, stock, category} = req.body
        
        if(!title,  !description,  !price, !code,  !stock,  !category )
            return res.status(404).json({msg:'los campos [title, description, price, code, stock, category] son obligatorios'});
        const producto = await addProductsService({...req.body})
        return res.json({producto})
    } catch (error) {
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}

export const updateProduct = async(req, res) =>{
    try {
        const { pid } = req.params;
        const {_id,...rest} = req.body
        const producto = await updateProductService(pid, rest)
        if(producto)
            return res.json({msg:'producto actualizado', producto})
        return res.status(404).json({msg: `no se pudo actualizar el producto con id ${pid}`})
    } catch (error) {
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}


export const deleteProduct = async(req, res) =>{
    try {
        const { pid } = req.params;
        const producto = await deleteProductService(pid)
        if(producto)
            return res.json({msg:'producto eliminado', producto})
        return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        console.log('deleteProduct -> ', error)
        return res.status(500).json({msg:'Hablar con el administrador.'})
    }
}