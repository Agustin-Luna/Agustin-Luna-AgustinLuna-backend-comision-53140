import { request,response } from "express";
import { cartModel } from "../models/carts.js";


export const getCartById = async(req, res) =>{
    try {
        const {cid} = req.params; 
        const carrito = await cartModel.findById(cid)
        if(carrito)
            return res.json({carrito})
        return res.status(404).json(`El carrito con id ${cid} no existe.`)
    } catch (error) {
        console.log('getCartById ->', error)
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}


export const createCarts = async(req, res) =>{
    try {
        const carrito = await cartModel.create({})
        return res.json({msg: 'carrito creado', carrito})
    } catch (error) {
        console.log('createCarts ->', error)
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}


export const addProductInCart = async(req, res) =>{
    try {
        const {cid, pid} = req.params; 
        const carrito = await cartModel.findById(cid)

        if(!carrito)
            return res.status(404).json({msg: `el carrito con id ${cid} no existe.`})

        const productoInCart = carrito.products.find(p => p.id.toString() === pid)

        if(productoInCart)
        productoInCart.quantity++
        else
        carrito.products.push({id:pid, quantity: 1})

        carrito.save()
        return res.json({msg: 'carrito actualizado.', carrito})
    } catch (error) {
        console.log('addProductInCart ->', error)
        return res.status(500).json({msg: 'hable con el admin.'})
    }
}