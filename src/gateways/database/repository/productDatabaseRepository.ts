import { ProductDTO } from "~domain/entity/types/productType";
import ProductRepository from "~domain/repository/productRepository";

import CategoryModel from "../models/categoryModel";
import ProductModel from "../models/productModel";

class ProductsDatabaseRepository implements ProductRepository {
  
  async createProduct(product: ProductDTO): Promise<ProductDTO> {
    try {
      const categoryExists = await CategoryModel.findByPk(
        product?.categoryId as string
      );

      if (!categoryExists) {
        throw new Error("category_not_found");
      }

      const productCreatedo = await ProductModel.create(
        {
          ...product,
        }
      );
      return productCreatedo;
    } catch (err: any) {
      console.error("Error creating product: ", err);
      throw new Error(err);
    }
  }

  async deleteProduct(idProduct: string): Promise<number> {
    try {
      return ProductModel.destroy({ where: { id: idProduct } });
    } catch (err: any) {
      console.error("Error deleting  product: ", err);
      throw new Error(err);
    }
  }

  async editaProduct(
    idProduct: string,
    product: ProductDTO
  ): Promise<ProductDTO | null> {
    try {
      const categoryExists = await CategoryModel.findByPk(
        product?.categoryId as string
      );

      if (!categoryExists) {
        throw new Error("category_not_found");
      }

      const productAtual = await ProductModel.findByPk(idProduct);

      if (productAtual) {
        Object.assign(productAtual, product);
        await productAtual.save();
      }
      return productAtual;
    } catch (err: any) {
      console.error("Error editing product: ", err);
      throw new Error(err);
    }
  }

  async listProducts(query: object): Promise<ProductDTO[]> {
    try {
      const products = await ProductModel.findAll({
        attributes: {
          exclude: ["categoryId"],
        },
        include: [
          {
            model: CategoryModel,
            as: "category",
          },
        ],
        where: { ...query },
      });
      return products;
    } catch (err: any) {
      console.error("Error listing products: ", err);
      throw new Error(err);
    }
  }

  async viewProduct(idProduct: string): Promise<ProductDTO | null> {
    try {
      const product = await ProductModel.findOne({
        attributes: {
          exclude: ["categoryId"],
        },
        include: [
          {
            model: CategoryModel,
            as: "category",
          },
        ],
        where: { id: idProduct },
      });
      return product;
    } catch (err: any) {
      console.error("Error viewing product: ", err);
      throw new Error(err);
    }
  }
}

export default ProductsDatabaseRepository;
