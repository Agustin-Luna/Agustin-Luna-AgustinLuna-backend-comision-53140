import { Router } from "express";
import { addProducts, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/products.controller.js";


const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post('/', addProducts);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);


// export default router;
export {router as productsRouter}
