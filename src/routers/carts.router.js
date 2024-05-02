import { Router } from "express";
import { addProductInCart, createCarts, getCartById } from "../controller/carts.controller.js";


const router = Router();


router.get('/:cid', getCartById);
router.post('/', createCarts);

router.post('/:cid/product/:pid', addProductInCart);


export default router;

