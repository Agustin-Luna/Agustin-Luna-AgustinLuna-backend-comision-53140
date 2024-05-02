import express from "express";
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import __dirname from "./utils.js";
import views from './routers/views.js'
import { dbConnection } from "./database/config.js";
import { productModel } from "./models/products.js";
import { messageModel } from "./models/messages.js";
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', views);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

await dbConnection()

const expressServer = app.listen(PORT, () => {console.log(`el server esta en linea en el puerto ${PORT}`); });
const io = new Server(expressServer)

io.on('connection', async(socket) => {
    //product
    const productos = await productModel.find()
    socket.emit('productos', productos)
    socket.on('agregarProducto', async (producto) => {
        const newProduct = await productModel.create({...producto})
        if(newProduct){
            productos.push(newProduct)
        }
        socket.emit('productos', productos)
        
    })
    //chat 
    const messages = await messageModel.find()
    socket.emit ('message', messages)

    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({...data})
        if(newMessage){
            const messages = await messageModel.find()
            io.emit('messageLogs', messages)
        }
    })
    socket.broadcast.emit('nuevo_user')
})

