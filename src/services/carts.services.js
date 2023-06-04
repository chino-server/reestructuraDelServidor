import CartsManager from "../DAL/cartsManager.js"
import { ProductManager }  from "../DAL/productsManager.js";


const carts = new CartsManager()
const productManager = new ProductManager()

export const addCartService = async () => {
  try {
    const cart = await carts.addCart();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const cart = await carts.getById(id);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCartService = async (cartId, ProductId, quantity) => {
  try {
    const productToCart = await carts.addProductToCart(
      cartId,
      ProductId,
      quantity
    );
 
    return productToCart
  } catch (error) {
    console.log(error);
  }
};

export const updateProductFromCart = async (cartId,product)=>{
  try {
    const cart = await carts.getById(cartId)
    
    if (!cart){
       throw new Error ('Carrito no encontrado')
    }
    const productsPromises = product.map(p=>productManager.findById({_id:p.pid}))
    const foundProducts = await Promise.all(productsPromises)

    if (foundProducts.includes(null)){
      throw new Error ('Algunos productos no existen')
    
    }
    const newCart = await carts.updateAllProductFromCart(cartId,product)
    return newCart
  } catch (error) {
    console.log(error);
  }
}

export const delCartServices= async (cartId)=>{
  try {
    const cart = await  carts.getById(cartId)
    if (!cart) {
      throw new Error ('El carrito no existe')
    }
    const delOneCart = carts.deleteCart(cartId)
      return delOneCart
    
    
  } catch (error) {
    console.log(error);
  }
}