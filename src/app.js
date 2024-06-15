import express from "express";
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import  passport  from "passport";
import 'dotenv/config'

import { dbConnection } from "./database/config.js";
import views from './routers/views.js'

import { initializaPassport } from "./config/passport.js";

import { productsRouter, cartsRouter } from "./routers/index.js";
import { messageModel } from "./DAO/mongo/models/messages.js";
import { ProductRepo } from "./repositories/index.js";

const app = express();
const PORT = process.env.PORT


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.URI_MONGO_DB,
        ttl: 3600
    }),
    secret:"coderCoder123",
    resave: true,
    saveUninitialized: true
}))

//config passport 
initializaPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', views);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

await dbConnection()

const expressServer = app.listen(PORT, () => {console.log(`el server esta en linea en el puerto ${PORT}`); });
const io = new Server(expressServer)

io.on('connection', async(socket) => {
    //product
    const {payload}= await ProductRepo.getProducts({})
    const productos = payload
    socket.emit('productos', payload)
    socket.on('agregarProducto', async (producto) => {
        const newProduct = await ProductRepo.addProducts({...producto})

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