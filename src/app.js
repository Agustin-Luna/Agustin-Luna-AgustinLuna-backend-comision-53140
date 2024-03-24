import express from 'express';
import ProductManager from './ProductManager.js';



const app = express()
const PORT = 8080
const p = new ProductManager(`./src/data/products.json`);

app.get('/products', (req, res) => {
    const productos = p.getProducts();
    return res.json({productos:productos})
})






app.listen(PORT , () => {
    console.log (`el server esta en linea en el puerto ${PORT}`)
})