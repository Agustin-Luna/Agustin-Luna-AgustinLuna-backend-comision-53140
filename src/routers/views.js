import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { prod } from "../app.js";


const router = Router();

router.get('/', (req,res) => {
    const productos = prod.getProducts()
    return res.render('home', {productos})
})


router.get('/RealTimeProducts', (req,res) => {
    return res.render('RealTimeProducts')
})


export default router;