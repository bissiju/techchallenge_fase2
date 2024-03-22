import ProductRepository from "../../../src/domain/repository/productRepository";

export default class ProductRepositoryMock {
    createdAt: Date
    deletedAt: null | Date
    updatedAt: null | Date
    
    constructor(createdAt: Date) {
        this.createdAt = createdAt
        this.deletedAt = null
        this.updatedAt = null
    }

    repository() {
        const productRepositoryMock: ProductRepository = {
            createProduct: jest.fn().mockResolvedValue({
              id: "1",
              name: "mock_1",
              preco: 10,
              descricao: null,
              createdAt: this.createdAt,
              deletedAt: this.deletedAt,
              updatedAt: this.updatedAt
            }),
            deleteProduct: jest.fn().mockResolvedValue(1),
            editProduct: jest.fn().mockResolvedValue({
              id: "1",
              name: "mock_1_editdo",
              preco: 1.1,
              descricao: "test",
              createdAt: this.createdAt,
              deletedAt: this.deletedAt,
              updatedAt: this.updatedAt
            }),
            listProducts: jest.fn().mockResolvedValue([
              {
                id: "1",
                name: "mock_1",
                preco: 10,
                descricao: null,
                createdAt: this.createdAt,
                deletedAt: this.deletedAt,
                updatedAt: this.updatedAt
              },
              {
                id: "2",
                name: "mock_2",
                preco: 101,
                descricao: null,
                createdAt: this.createdAt,
                deletedAt: this.deletedAt,
                updatedAt: this.updatedAt
              },
              {
                id: "3",
                name: "mock_4",
                preco: 10,
                descricao: null,
                createdAt: this.createdAt,
                deletedAt: this.deletedAt,
                updatedAt: this.updatedAt
              }
            ]),
            viewProduct: jest.fn().mockResolvedValue({
              id: "1",
              name: "mock_1",
              preco: 10,
              descricao: null,
              createdAt: this.createdAt,
              deletedAt: this.deletedAt,
              updatedAt: this.updatedAt
            }),
          };

          return productRepositoryMock;
    }
}
