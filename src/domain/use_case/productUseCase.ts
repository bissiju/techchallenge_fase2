import Product from "~domain/entity/product";
import { ProductDTO, ProductInput } from "~domain/entity/types/productType";
import ProductRepository from "~domain/repository/productRepository";


export default class ProductUseCase {
  static async createProduct(productRepository: ProductRepository, productInput: ProductInput): Promise<ProductDTO> {
    const product = new Product(productInput);

    return productRepository.createProduct(product);

  }

  static async deleteProduct(productRepository: ProductRepository, idProduct: string): Promise<number> {
    return productRepository.deleteProduct(idProduct);
  }

  static async editaProduct(
    productRepository: ProductRepository,
    idProduct: string,
    productInput: ProductInput
  ): Promise<ProductDTO | null> {
    const product = await ProductUseCase.viewProduct(productRepository, idProduct);

    if (product) {
      product.name = productInput.name ?? product.name;
      product.categoryId = productInput.categoryId ?? product.categoryId;
      product.price = productInput.price ?? product.price;
      product.description = productInput.description ?? product.description;

      return productRepository.editaProduct(idProduct, product);
    }

    return null;

  }

  static async listProducts(productRepository: ProductRepository, query: object): Promise<ProductDTO[]> {
    const products = productRepository.listProducts(query);
    return products;
  }

  static async viewProduct(productRepository: ProductRepository, idProduct: string): Promise<ProductDTO | null> {
    return productRepository.viewProduct(idProduct);
  }
}
