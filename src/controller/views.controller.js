import { CartRepo, ProductRepo } from "../repositories/index.js"

export const homeView = async (req, res) => {
    const {payload} = await ProductRepo.getProducts({})
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
    
    const result = await ProductRepo.getProducts({...req.query})
    return res.render('products', {title: 'productos', result, styles: 'products.css', user})
}

export const cartsIdViews = async (req, res) =>{
    const {cid} = req.params
    // const carrito = await getCartByIdService(cid)
    const carrito = await CartRepo.getCartById(cid)
    const user = req.session.user
    return res.render('cart', {title: 'carrito', carrito, styles: 'cart.css', user})
}

export const LoginGetViews = async(req,res) =>{
    if(req.session.user)
        return res.redirect('/')

    return res.render('login',{ title: 'login',styles: 'login.css' })
}


export const registroGetViews = async(req,res) =>{
    if(req.session.user)
        return res.redirect('/')
    return res.render('registro', {title: 'registro', styles: 'login.css'})
}

export const registroPostViews = async(req,res) =>{
    if(!req.user)
        return res.redirect('/registro')
    return res.redirect('/login')
}

export const login = async(req,res) =>{
    if(!req.user)
        return res.redirect('/login')

    req.session.user = {
        name: req.body.name,
        lastName: req.body.lastName, 
        email: req.body.email,
        rol: req.body.rol,
    }
    return res.redirect('/')
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