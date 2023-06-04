import { Router } from "express";
import {
  getAllProducts,
  findProductById,
  addControllerProduct,
  updateByIdControllers,
  deleteByIdControllers,
} from "../controllers/products.controllers.js";

const router = Router();
// Endpoint para actualizar traer todos los productos
router.get("/products", getAllProducts);

// Endpoint para buscar un producto por ID
router.get("/product/:pid", findProductById);

// Endpoint para buscar agregar un producto
router.post("/product", addControllerProduct);

// Endpoint para actualizar un producto
router.put("/product/:pid", updateByIdControllers);

// Endpoint para eliminar un producto

router.delete("/product/:pid", deleteByIdControllers);

export default router;
