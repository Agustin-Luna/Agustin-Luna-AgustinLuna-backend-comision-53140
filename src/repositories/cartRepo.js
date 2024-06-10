import { CartDao } from "../DAO/index.js";


export const getCartById = async(cid) => await CartDao.getCartById(cid)
export const createCarts = async() => await CartDao.createCarts()
export const addProductInCart = async(cid, pid) => await CartDao.addProductInCart(cid, pid)
export const deleteProductsInCart = async(cid, pid) => await CartDao.deleteProductsInCart(cid, pid)
export const updateProductsInCart = async(cid, pid, quantity) => await CartDao.updateProductsInCart(cid, pid, quantity) 
export const deleteCart = async(cid) => await CartDao.deleteCart(cid)