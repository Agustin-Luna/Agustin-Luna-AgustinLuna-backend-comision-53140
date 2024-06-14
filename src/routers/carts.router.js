import { Router } from "express";
import { addProductInCart, createCarts, deleteCart, deleteProductsInCart, getCartById, updateProductsInCart } from "../controller/carts.controller.js";


const router = Router();


router.get('/:cid',  getCartById);
router.post('/',  createCarts);

router.post('/:cid/product/:pid',  addProductInCart);
router.delete('/:cid/products/:pid',  deleteProductsInCart)
router.put('/:cid/products/:pid',  updateProductsInCart)
router.delete('/:cid',  deleteCart)


export {router as cartsRouter}

