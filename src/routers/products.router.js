import { Router } from "express";
import { addProducts, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/products.controller.js";
import { validarJWT } from "../middleware/auth.js";


const router = Router();

router.get("/",validarJWT, getProducts);
router.get("/:pid",validarJWT, getProductById);
router.post('/',validarJWT, addProducts);
router.put('/:pid',validarJWT, updateProduct);
router.delete('/:pid',validarJWT, deleteProduct);


// export default router;
export {router as productsRouter}
