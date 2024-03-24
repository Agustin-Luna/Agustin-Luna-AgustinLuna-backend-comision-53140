import fs from 'fs';

class ProductManager {
    products;
    path
    static idProducto = 0;

    constructor() {
        this.path = './src/data/productos.json'
        this.products = this.leerProductosInFile()
    }

    asignarIdProducto(){
        let id = 1
        if(this.products.length != 0)
        id = this.products[this.products.length - 1].id + 1
        return id
    }


    leerProductosInFile(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            }
            return []
        } catch (error) {
            console.log(`ocurrio un error al momento de leer el file, ${error}`)
        }
    }

    guardarFile(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log(`ocurrio un error al momento de guardar el file, ${error}`)
        }
    }

addProducts(title, description,price, thumbnail, code,stock) {

    if(!title || !description || !price || !thumbnail || !code || !stock)
        return 'todos los parametros son requeridos'
    
    const codigoRepetido = this.products.some(p => p.code == code)
    if(codigoRepetido)
        return `el codigo ${code} ya se encuentra registrado en otro producto`

        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = this.asignarIdProducto()
        const nuevoProducto = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
    this.products.push(nuevoProducto)
    this.guardarFile()
    return 'producto agregado exitosamente'
}

getProducts() {
    return this.products;
}

getProductById(id){
    const producto = this.products.find(p => p.id == id)
    if(producto)
        return producto;
    else
        `not found del producto con id ${id}`


}

updateProduct(id, objetoUpdate){
    let msg = `el producto con id ${id} no existe`;
    const index = this.products.findIndex(p => p.id === id)
    if(index !== -1){
        const {id, ...rest} = objetoUpdate
        this.products[index] = {...this.products[index],...rest}
        this.guardarFile()
        msg = 'producto actualizado'
    }
    return msg
}

deleteProduct (id) {
    let msg =  `el producto con id ${id} no exite`
    const index = this.products.findIndex(p => p.id === id)
    if(index !== -1){
        this.products = this.products.filter(p => p.id !== id)
        this.guardarFile()
        msg = 'producto eliminado'
    }
return msg
}
}

export default ProductManager;

