import express from "express";
import ProductManager from "./ProductManager.js";
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import __dirname from "./utils.js";
import views from './routers/views.js'


const app = express();
const PORT = 8080;
export const prod = new ProductManager("./data/productos.json");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', views);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const expressServer = app.listen(PORT, () => {console.log(`el server esta en linea en el puerto ${PORT}`); });
const socketServer = new Server(expressServer)

socketServer.on('connection', (socket) => {
    const productos = prod.getProducts()
    socket.emit('productos', productos)

    socket.on('agregarProducto', producto => {
        const result = prod.addProducts({...producto})
        if(result.producto)
        socket.emit('productos', result.producto)
        
    })
})

