import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { prod } from "../app.js";


const router = Router();

router.get("/", (req, res) => {
    const { limit } = req.query;
    return res.json({ productos: prod.getProducts(limit) });
});

router.get("/:pid", (req, res) => {
    const { pid } = req.params;
    return res.json({ producto: prod.getProductById(Number(pid)) });
});

router.post('/', (req,res) => {
    const {title, description, price, thumbnails, code, stock, category, status} = req.body;
    const result = prod.addProducts(title, description, price, thumbnails, code, stock, category, status);
    return res.json ({result})
});

router.put('/:pid', (req,res) => {
    const { pid } = req.params;
    const result = prod.updateProduct(Number(pid), req.body);
    return res.json({result});
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = prod.deleteProduct(Number(pid));
    return res.json({result});
});






export default router;

