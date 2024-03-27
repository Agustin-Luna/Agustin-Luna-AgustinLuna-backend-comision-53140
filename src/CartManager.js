import fs from "fs";
import ProductManager from "./ProductManager.js";

class CartsManager {
    carts;
    path;
    static idProducto = 0;

    constructor() {
    this.path = "./data/carritos.json";
    this.carts = this.leerCarritoInFile();
    }

    asignarIdCart() {
    let id = 1;
    if (this.carts.length != 0)
        id = this.carts[this.carts.length - 1].id + 1;
    return id;
    }

    leerCarritoInFile() {
    try {
        if (fs.existsSync(this.path)) {
        return JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }
        return [];
    } catch (error) {
        console.log(`ocurrio un error al momento de leer el file, ${error}`);
    }
    }

    guardarFile() {
    try {
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    } catch (error) {
        console.log(`ocurrio un error al momento de guardar el file, ${error}`);
    }
    }

    createCarts() {
        const newCart = {
            id: this.asignarIdCart(),
            products: []
        }
        this.carts.push(newCart);
        this.guardarFile()
        return newCart;
    }


    getCartById(id) {
    const producto = this.carts.find((p) => p.id == id);
    if (producto) {
        return producto;
    } else {
        return console.log(message.error);
    }
    }

    addProductInCart(cid, pid) {
        let respuesta = `carrito con id ${cid} no existe`;
        const indexCarrito = this.carts.findIndex(c => c.id === cid);
        
        if(indexCarrito !== -1){
            const indexProductInCart = this.carts[indexCarrito].products.findIndex(p => p.id === pid);
            const p = new ProductManager();
            respuesta = 'producto agregado al cart'
            const producto = p.getProductById(pid);


            if(producto.status && indexProductInCart === -1){
                this.carts[indexCarrito].products.push({id: pid, 'quantity': 1});
                this.guardarFile();
            } else if (producto.status && indexProductInCart !== -1){
                ++ this.carts[indexCarrito].products[indexProductInCart].quantity;
                this.guardarFile();
                respuesta = 'producto agregado al cart'
            }else {
                respuesta = `producto con id ${pid} no existe`;
            }
        }
        return respuesta;


    };  


};
export default CartsManager;
