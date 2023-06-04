import { productsModel } from "./models/products.model.js";

export class ProductManager {
  async getProducts(search, opcions) {
    try {
      const products = await productsModel.paginate(search, opcions);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new productsModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const product = await productsModel.findOne(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById (id){
    try {
      const product = await productsModel.deleteOne({_id:id})
      return product
    } catch (error) {
      console.log(error)
    };
  }

  async updateById (id,obj){
    try {
      const product = await productsModel.updateOne({_id:id},{$set:obj})
      return product
    } catch (error) {
      console.log(error);
    }
  }

}
