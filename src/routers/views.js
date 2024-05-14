import { Router } from "express";
import { getProductsService } from "../services/products.services.js";
import { getCartByIdService } from "../services/cart.services.js";
import { LoginGetViews, cartsIdViews, chatViews, homeView, loginPostViews, logout, productsViews, realTimeProductsViews, registroGetViews, registroPostViews } from "../controller/views.controller.js";
import { admin, auth } from "../middleware/auth.js";


const router = Router();

router.get('/',homeView)
router.get('/RealTimeProducts', [auth, admin], realTimeProductsViews)
router.get('/chat', auth,chatViews)
router.get('/products',[auth, admin],productsViews)
router.get('/cart/:cid', [auth, admin],cartsIdViews)

router.get('/login', LoginGetViews)
router.post('/login', loginPostViews)

router.get('/registro', registroGetViews)
router.post('/registro',registroPostViews)

router.get('/logout', logout)



export default router;