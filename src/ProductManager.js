import fs from "fs";

class ProductManager {
    products;
    path;
    static idProducto = 0;

    constructor() {
    this.path = "./data/productos.json";
    this.products = this.leerProductsInFile();
    }

    asignarIdProducto() {
    let id = 1;
    if (this.products.length != 0)
        id = this.products[this.products.length - 1].id + 1;
    return id;
    }

    leerProductsInFile() {
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
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    } catch (error) {
        console.log(`ocurrio un error al momento de guardar el file, ${error}`);
    }
    }

    addProducts(title, description, price, thumbnails = [], code, stock, category, status = true) {
        let result = 'ocurrio un error' 
    if (!title || !description || !price || !code || !stock || !category){
        result  = "todos los parametros son requeridos title, description, price, code, stock, category,";
    }else{
    const codigoRepetido = this.products.some((p) => p.code == code);
    if (codigoRepetido){
        result = `el codigo ${code} ya se encuentra registrado en otro producto`;
    }else{
        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = this.asignarIdProducto();
        const nuevoProducto = {
            id,
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status
        };
        this.products.push(nuevoProducto);
        this.guardarFile();
        result = {
            msg: 'producto agregado exitosamente',
            producto: nuevoProducto
        }
        }
    }


    return result;
    }

    getProducts(limit = 0) {
    limit = Number(limit);
    if (limit > 0) return this.products.slice(0, limit);
    return this.products;
    }

    getProductById(id) {
        let status = false;
        let resp = `el prod con id ${id} no existe`
        const producto = this.products.find((p) => p.id == id);
        if (producto) {
        status = true
        resp = producto;
    } 
    return {status, resp};
    }

    updateProduct(id, objetoUpdate) {
    let result= `el producto con id ${id} no existe`;
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
        const { id, ...rest } = objetoUpdate;
        const propsPermitidas = ['title', 'description',' price', 'thumbnails', 'code', 'stock', 'category',' status']
        const propsActualizadas = Object.keys(rest)
        .filter (propiedad => propsPermitidas.includes(propiedad))
        .reduce((obj, key) => {
            obj [key] = rest[key];
            return obj;
        }, {});
        this.products[index] = { ...this.products[index], ...propsActualizadas};
        this.guardarFile();
        result  = {
            msg: 'producto actualizado',
            producto: this.products[index]
        };
    } 
    return result;
    }

    deleteProduct(id) {
    let msg = `el producto con id ${id} no exite`;
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
        this.products = this.products.filter((p) => p.id !== id);
        this.guardarFile();
        msg = "producto eliminado";
    }
    return msg;
    }
}

export default ProductManager;
