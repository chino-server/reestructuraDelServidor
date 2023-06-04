import { Router } from "express";
import { ProductManager } from "../DAL/productsManager.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = Router();
const productManager = new ProductManager();

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

router.get("/products", ensureAuthenticated, async (req, res) => {
  const products = await productManager.getProducts();
  let userEmail = req.user.email;

  const plainProducts = products.docs.map((product) => ({
    ...product.toObject(),
  }));

  res.render("products", { ...products, docs: plainProducts, userEmail });
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
