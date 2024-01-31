import { ProductDTO, ProductInput } from "~domain/entity/types/productType";
import ProductRepository from "~domain/repository/productRepository";
import ProductUseCase from "~domain/use_case/productUseCase";

export class ProductController {

  static async createProduct(
    productRepository: ProductRepository,
    product: ProductInput
  ): Promise<ProductDTO | null> {
    const productCreated = await ProductUseCase.createProduct(
      productRepository, product
    );
    return productCreated;
  }

  static async deleteProduct(
    productRepository: ProductRepository,
    id: string
  ): Promise<number> {
    const productDeleted = await ProductUseCase.deleteProduct(
      productRepository, id
    );
    return productDeleted;
  }

  static async editaProduct(
    productRepository: ProductRepository,
    id: string,
    product: ProductInput
  ): Promise<ProductDTO | null> {
    const productDeleted = await ProductUseCase.editaProduct(
      productRepository, id, product
    );
    return productDeleted;
  }

  static async listProducts(
    productRepository: ProductRepository,
    query: any,
  ): Promise<ProductDTO[]> {
    return await ProductUseCase.listProducts(productRepository, query);
  }

  static async viewProduct(
    productRepository: ProductRepository,
    id: string
  ): Promise<ProductDTO | null> {
    return await ProductUseCase.viewProduct(productRepository, id);
  }
}