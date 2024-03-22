import { ProductInput } from "../../src/domain/entities/types/productType";
import ProductRepository from "../../src/domain/repository/productRepository";
// import ProductRepository from "../../src/domain/repository/productRepository";
import ProductUseCase from "../../src/domain/useCases/productUseCase";
import ProductRepositoryMock from "../mock/repository/productRepositoryMock";


describe('ProductUseCase', () => {
  let productRepositoryMock: ProductRepository;
  const createdAt = new Date();
  const updatedAt = null;
  beforeEach(() => {
    productRepositoryMock = new ProductRepositoryMock(createdAt).repository();
  })


  it('Testa a createcao do product', async () => {

    const productInput: ProductInput = {
      id: "1",
      name: "mock_1",
      preco: 10,
      descricao: 'test',
      createdAt,
      deletedAt: null,
      updatedAt: null
    }

    const novoProduct = await ProductUseCase.createProduct(productRepositoryMock, productInput)

    expect(novoProduct.id).toBe(productInput.id);
    expect(novoProduct.name).toBe(productInput.name);
  });

  it('Testa a validacao do valor do product > 0', async () => {

    const productInput: ProductInput = {
      id: "1",
      name: "mock_1",
      preco: 0,
      descricao: 'test',
      createdAt: new Date(),
      deletedAt: null,
      updatedAt: null
    }

    expect(async () => {
      await ProductUseCase.createProduct(productRepositoryMock, productInput)
    }).rejects.toThrow()
  });

  it('Testa deleter um product', async () => {
    const productDeletado = await ProductUseCase.deleteProduct(productRepositoryMock, "1")

    expect(productDeletado).toBe(1);

  });

  it('Testa atualizar uma product', async () => {

    const productAtt: ProductInput = {
      id: "1",
      name: "mock_1_editdo",
      preco: 1.1,
      descricao: "test",
      createdAt,
      deletedAt: null,
      updatedAt
    }

    const productAtualizado = await ProductUseCase.editProduct(productRepositoryMock, "1", productAtt)

    expect(productAtualizado?.id).toBe(productAtt.id);
    expect(productAtualizado?.name).toBe("mock_1_editdo");
    expect(productAtualizado?.preco).toBe(1.1);
    expect(productAtualizado?.descricao).toBe("test");

  });

  it('Testa retornar uma product', async () => {

    const expected = {
      id: "1",
      name: "mock_1",
      preco: 10,
      descricao: null,
      createdAt,
      deletedAt: null,
      updatedAt: null
    }
    const retornaProduct = await ProductUseCase.retornaProduct(productRepositoryMock, "1")
    expect(retornaProduct).toStrictEqual(expected)

  });

  it('Testa lista de products', async () => {
    const listaProduct = await ProductUseCase.listaProducts(productRepositoryMock, {})

    expect(listaProduct).toHaveLength(3)
  });
});
