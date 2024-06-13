import { Router } from "express";altime
import { LoginGetViews, cartsIdViews, chatViews, homeView, login, logout, productsViews, realTimeProductsViews, registroGetViews, registroPostViews } from "../controller/views.controller.js";
import { auth } from "../middleware/auth.js";
import  passport  from "passport";



const router = Router();

router.get('/',homeView)
router.get('/RealTimeProducts', auth, realTimeProductsViews)
router.get('/chat', auth,chatViews)
router.get('/products',auth,productsViews)
router.get('/cart/:cid', auth,cartsIdViews)
router.get('/login', LoginGetViews)
router.get('/registro', registroGetViews)
router.get('/logout', logout)


router.post('/registro', passport.authenticate('registro',{failureRedirect:'/registro'}),registroPostViews)
router.post('/login', passport.authenticate('login',{failureRedirect:'/login'}), login)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) =>{})
router.get('/callbackGithub', passport.authenticate('github', {failureRedirect: '/registro'}), login)
export default router;