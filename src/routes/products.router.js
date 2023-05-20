import { Router } from "express";
import {ProductManager}  from "../dao/productsManager.js";


const router = Router()

const productManager= new ProductManager()

router.get ('/', async (req, res)=>{
    const products = await productManager.getProducts()
    res.json ({products})

})

router.post("/", async (req, res) => {
    try {
      const product = req.body;
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.stock ||
        !product.category
      ) {
        res
          .status(400)
          .send({ status: "error", error: "Todos los campos son obligatorios" });
        return;
      }
      const newProduct = await productManager.addProduct(product);
      if (!newProduct) {
        res
          .status(400)
          .send({ status: "error", error: "El código del producto ya existe" });
      } else {
        res.status(201).send({ status: "success", payload: newProduct });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ status: "error", error: "Error al agregar el producto" });
    }
});


export default router