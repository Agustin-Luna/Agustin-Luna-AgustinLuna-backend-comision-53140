import { request,response } from "express";
import { CartRepo } from "../repositories/index.js";


export const getCartById = async(req, res) =>{
    try {
        const {cid} = req.params; 
        const carrito = await CartRepo.getCartById(cid)
        if(carrito)
            return res.json({carrito})
        return res.status(404).json(`El carrito con id ${cid} no existe.`)
    } catch (error) {
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}

export const createCarts = async(req, res) =>{
    try {
        const carrito = await CartRepo.createCarts()
        return res.json({msg: 'carrito creado', carrito})
    } catch (error) {
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}

export const addProductInCart = async(req, res) =>{
    try {
        const {cid, pid} = req.params; 

        const carrito = await CartRepo.addProductInCart(cid, pid)

        if(!carrito)
            return res.status(404).json({msg: `el carrito con id ${cid} no existe.`})

        return res.json({msg: 'carrito actualizado.', carrito})
    } catch (error) {
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}

export const deleteProductsInCart = async(req,res) => {
    try {
        const {cid, pid} = req.params

        const carrito  = await CartRepo.deleteProductsInCart(cid, pid)
        if(!carrito) 
            return res.status(404).json({msg: 'no se pudo realizar la operacion.'})
        return res.json({msg: 'producto eliminado del carrito.', carrito })
    } catch(error) {
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}

export const updateProductsInCart = async(req,res) => {
    try {
        const {cid, pid} = req.params
        const {quantity} = req.body
        if(!quantity || !Number.isInteger(quantity))
            res.status(404).json({msg: 'el quantity es obligatorio y debe ser un numero entero.'})

        const carrito  = await CartRepo.updateProductsInCart(cid, pid, quantity)

        if(!carrito) 
            return res.status(404).json({msg: 'no se pudo realizar la operacion.'})
        return res.json({msg: 'producto actualizado.', carrito })
    } catch(error) {
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}

export const deleteCart = async(req,res) => {
    try {
        const {cid, pid} = req.params

        const carrito  = await CartRepo.deleteCart(cid)
        if(!carrito) 
            return res.status(404).json({msg: 'no se pudo realizar la operacion.'})
        return res.json({msg: 'producto actualizado.', carrito })
    } catch(error) {
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}
