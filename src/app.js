import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;
const prod = new ProductManager("./data/productos.json");

app.get("/products", (req, res) => {
    const { limit } = req.query;

    return res.json({ productos: prod.getProducts(limit) });
});

app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;
    return res.json({ producto: prod.getProductById(Number(pid)) });
});

app.listen(PORT, () => {
    console.log(`el server esta en linea en el puerto ${PORT}`);
});
