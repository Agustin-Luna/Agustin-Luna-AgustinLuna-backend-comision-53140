import { getCartByIdService } from "../services/cart.services.js"
import { getProductsService } from "../services/products.services.js"
import { getUserEmail, userRegistro } from "../services/user.js"


export const homeView = async (req, res) => {
    const {payload} = await getProductsService({})
    const user = req.session.user
    return res.render('home', {productos: payload, styles: 'styles.css', title: 'Home', user})
}

export const realTimeProductsViews = async (req, res) =>{
    const user = req.session.user
    return res.render('RealTimeProducts',{ title:'Real Time Products', styles:'styles.css', user})
}

export const chatViews = async (req, res) => {
    const user = req.session.user
    return res.render('chat', {styles: 'chat.css', title:'Chat', user})
}

export const productsViews = async (req, res) => {
    const user = req.session.user
    const result = await getProductsService({...req.query})
    return res.render('products', {title: 'productos', result, styles: 'products.css', user})
}

export const cartsIdViews = async (req, res) =>{
    const {cid} = req.params
    const carrito = await getCartByIdService(cid)
    const user = req.session.user
    return res.render('cart', {title: 'carrito', carrito, styles: 'cart.css', user})
}

export const LoginGetViews = async(req,res) =>{
    return res.render('login',{ title: 'login',styles: 'login.css' })
}


export const registroGetViews = async(req,res) =>{
    return res.render('registro', {title: 'registro', styles: 'login.css'})
}

export const registroPostViews = async(req,res) =>{
    const {password, confirmPassword} = req.body
    
    if(password !== confirmPassword)
        return res.redirect('/registro')
    const user = await userRegistro({...req.body})

    if(user){
        const userName = `${user.name} ${user.lastName}`
        req.session.user = userName
        req.session.rol = user.rol
        return res.redirect('/')
    }
    return res.redirect('/registro')
}

export const loginPostViews = async(req,res) =>{
    const {email, password} = req.body

    const user = await getUserEmail(email)

    if(user && user.password === password){
        const userName = `${user.name} ${user.lastName}`
        req.session.user = userName
        req.session.rol = user.rol
        return res.redirect('/')
    }
    return res.redirect('/login')
}

export const logout = async (req,res) => {
    req.session.destroy(err => {
        if(err){
            return res.send({status: false, body: err})
        }else {
            return res.redirect('/login')
        }
    })
}