

export const auth = (req, res, next) =>{
    if(req.session?.user)
        return next()
    return res.redirect('/login')
}


export const admin = (req, res, next) =>{
    if(req.session?.rol === 'admin')
        return next()
    return res.redirect('/login')
}