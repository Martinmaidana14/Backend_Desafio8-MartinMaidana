
import productModel from "../models/product.js";

export const getProducts = async (limit, page, filter, ord) => {
    let metFilter;
    const pag = page !== undefined ? page : 1;
    const limi = limit !== undefined ? limit : 10;

    if (filter == "true" || filter == "false") {
        metFilter = "status"
    } else {
        if (filter !== undefined)
            metFilter = "category";
    }

    const query = metFilter != undefined ? { [metFilter]: filter } : {};
    const ordQuery = ord !== undefined ? { price: ord } : {};

    const prods = await productModel.paginate(query, { limit: limi, page: pag, sort: ordQuery });
    return prods
}

export const getProduct = async (idProducto) => {
    const prod = await productModel.findById(idProducto)
    return prod
}

export const createProduct = async (product) => {
    const mensaje = await productModel.create(product)
    return mensaje
}

export const updateProduct = async (idProducto, upProduct) => {
    const mensaje = await productModel.findByIdAndUpdate(idProducto, upProduct)
    return mensaje
}

export const deleteProduct = async (idProducto) => {
    const mensaje = await productModel.findByIdAndDelete(idProducto)
    return mensaje
}