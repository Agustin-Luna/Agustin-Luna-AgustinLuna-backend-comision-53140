import { Router } from "express";
import { getProductsService } from "../services/products.services.js";
import { getCartByIdService } from "../services/cart.services.js";
import { LoginGetViews, cartsIdViews, chatViews, homeView, loginPostViews, logout, productsViews, realTimeProductsViews, registroGetViews, registroPostViews } from "../controller/views.controller.js";
import { auth } from "../middleware/auth.js";


const router = Router();

router.get('/',homeView)
router.get('/RealTimeProducts', auth, realTimeProductsViews)
router.get('/chat', auth,chatViews)
router.get('/products', auth,productsViews)
router.get('/cart/:cid', auth,cartsIdViews)

router.get('/login', LoginGetViews)
router.post('/login', loginPostViews)

router.get('/registro', registroGetViews)
router.post('/registro',registroPostViews)

router.get('/logout', logout)



export default router;