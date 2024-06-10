import { productModel } from "./models/products.js";



export const getProducts = async({limit = 2, page = 1, sort, query}) =>{

        page = page == 0 ? 1 :page;
        page = Number(page);
        limit = Number(limit)
        const skip = (page-1) * limit;
        const sortOrderOption = {'asc': -1,'desc':1}
        sort = sortOrderOption[sort] || null

        try {
            if(query)
                query = JSON.parse(decodeURIComponent(query))
        } catch (error) {
            console.log('hubo un error', error)
            query = {}
        }
        const queryProducts = productModel.find(query).limit(limit).skip(skip).lean()
        if(sort !== null)
            queryProducts.sort({price:sort})
        const [productos,totalDocs]= await Promise.all( [queryProducts, productModel.countDocuments(query)]);

        const totalPages = Math.ceil(totalDocs / limit)
        const hastNexPage = page < totalPages
        const hasPrevPage = page > 1
        const prevPage = hasPrevPage ? page -1 : null
        const nextPage = hastNexPage ? page +1 : null

        return {
            totalPages,
            hastNexPage,
            prevPage,
            nextPage,
            hasPrevPage,
            limit,
            query: JSON.stringify(query),
            page,
            prevLink: '', 
            nextLink: '',
            payload: productos,
        }

}

export const getProductById = async(pid) => await productModel.findById(pid)

export const getProductByCode = async (code) => await productModel.findOne({code})

export const addProducts = async({title, description, price, thumbnail, code, stock, category,status}) => await productModel.create({title, description, price, thumbnail, code, stock, category,status})

export const updateProduct = async(pid, rest) => await productModel.findByIdAndUpdate(pid, {...rest}, {new:true})

export const deleteProduct = async(pid) => await productModel.findByIdAndDelete(pid)

