
import { productsModel } from "../db/models/products.model.js";


export class ProductManager {
    async getProducts(){
        try {
            const products = await productsModel.find().lean()
            return products
            
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

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }


}