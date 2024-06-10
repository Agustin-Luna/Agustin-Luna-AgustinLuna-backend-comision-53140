import { Router } from "express";
import { addProductInCart, createCarts, deleteCart, deleteProductsInCart, getCartById, updateProductsInCart } from "../controller/carts.controller.js";
import { validarJWT } from "../middleware/auth.js";

const router = Router();


router.get('/:cid',validarJWT,  getCartById);
router.post('/',validarJWT,  createCarts);

router.post('/:cid/product/:pid',validarJWT,  addProductInCart);
router.delete('/:cid/products/:pid',validarJWT,  deleteProductsInCart)
router.put('/:cid/products/:pid',validarJWT,  updateProductsInCart)
router.delete('/:cid',validarJWT,  deleteCart)


export {router as cartsRouter}

