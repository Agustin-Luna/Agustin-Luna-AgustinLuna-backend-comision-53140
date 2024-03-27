import express from "express";
import ProductManager from "./ProductManager.js";
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'


const app = express();
const PORT = 8080;
export const prod = new ProductManager("./data/productos.json");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get ('/', (req,res) => {
    return res.send('Proyecto back-end')
})
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);







app.listen(PORT, () => {
    console.log(`el server esta en linea en el puerto ${PORT}`);
});
