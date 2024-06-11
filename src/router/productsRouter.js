
import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";


const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit, page, filter, ord } = req.query;
        const prods = await getProducts(limit, page, filter, ord)

        res.status(200).send(prods)

    } catch (error) {
        res.status(500).render('templates/error', {
            error: error,
        });
    }
});

//: significa que es modificable (puede ser un 4 como un 10 como un 75)
productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid //Todo dato que se consulta desde un parametro es un string
        const prod = await getProduct(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body
        const mensaje = await createProduct(product)
        res.status(201).send(mensaje)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const upProduct = req.body
        const prod = await updateProduct(idProducto, upProduct)
        res.status(200).send(prod)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const mensaje = await deleteProduct(idProducto)
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
})

export default productsRouter

