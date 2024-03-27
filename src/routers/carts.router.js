import { Router } from "express";
import { prod } from "../app.js";
import CartsManager from "../CartManager.js";

const router = Router();
const car = new CartsManager('./data/carritos.json')

router.get('/:cid', (req,res) => {
    const {cid} = req.params; 
    const result = car.getCartById(Number(cid));
    return res.json({result})
});


router.post('/', (req,res) => {
    const result = car.createCarts();
    
    return res.json({result});
});

router.post('/:cid/product/:pid', (req,res) => {
    const {cid, pid} = req.params; 
    const result = car.addProductInCart(Number(cid), Number(pid))
    return res.json({result});
});


export default router;

