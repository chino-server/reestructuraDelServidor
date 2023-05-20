import { Router } from "express";
import { ProductManager } from "../dao/productsManager.js";

const router = Router();
const productManager = new ProductManager ()

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("products");
  } else {
    res.render("login", { title: "Inicia session para ver los productos" });
  }
});

router.get("/register", (req, res) => {
  res.render("register", { title: "pagina" });
});

router.get("/products", async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    if (req.user){
      const products = await productManager.getProducts()
      let userEmail = req.user.email
      
      res.render("products", {products, userEmail})
    }
    else {
      res.send ({message:'inicar session para ver los productos'})
    }
  }
});

router.get("/products/:id", async (req, res) => {

  const product = await productManager.getProductById(req.params.id);

  const { _id, title, description, price, code, stock, category, image } =
    product;

  res.render("productDetail", {
    id: _id,
    title,
    description,
    price,
    code,
    stock,
    category,
    image,
  });
});


export default router;
