import { ProductManager } from "../DAL/productsManager";

const productManager = ProductManager();

export const getProducts = async (params) => {
  try {
    const limit = parseInt(params.limit) || 10
    const page = parseInt (params.page) || 1
    let sort = {}
    if (params.sort === 'asc'){
        sort = {price : 1}
    }else{
        sort= {price : -1}
    }
    const products = await productManager.getProducts();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const findById = async (id) => {
  try {
    const product = await productManager.findById(id);
    return product
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product)=>{

}