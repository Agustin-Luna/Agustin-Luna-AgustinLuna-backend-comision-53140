import { ProductDao } from "../DAO/index.js";

export const getProducts = async(query) => await ProductDao.getProducts(query)
export const getProductById = async(pid) => await ProductDao.getProductById(pid)
export const addProducts = async(body) => await ProductDao.addProducts(body)
export const updateProduct = async(pid, rest) => await ProductDao.updateProduct(pid, rest)
export const deleteProduct = async(pid) => await ProductDao.deleteProduct(pid)