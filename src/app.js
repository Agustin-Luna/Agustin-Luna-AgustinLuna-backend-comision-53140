import express from 'express';
import ProductManager from './ProductManager.js';


const app = express()
const PORT = 8080
const p = new ProductManager();

app.get('/products', (req, res) => {
    return res.json({productos:p.getProducts()})
})


app.listen(PORT , () => {
    console.log (`el server esta en linea en el puerto ${PORT}`)
})