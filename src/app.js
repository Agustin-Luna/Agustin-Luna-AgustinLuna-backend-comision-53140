import express from "express";
import 'dotenv/config'

//route
import { productsRouter, cartsRouter,authRouter } from "./routers/index.js";

import __dirname from "./utils.js";
import { dbConnection } from "./database/config.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

//endpoint
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//inicio base de datos
await dbConnection()

app.listen(PORT, () => {console.log(`el server esta en linea en el puerto ${PORT}`); });


