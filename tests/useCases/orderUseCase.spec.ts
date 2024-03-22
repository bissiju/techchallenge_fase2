import { statusDePagamento } from "../../src/domain/entities/fatura";
import { ItemDoOrderInput } from "../../src/domain/entities/types/itensOrderType";
import { RealizaOrderInput } from "../../src/domain/entities/types/orderService.type";
import { OrderInput } from "../../src/domain/entities/types/orderType";
import CheckoutRepository from "../../src/domain/repository/checkoutRepository";
import FaturaRepository from "../../src/domain/repository/faturaRepository";
import OrderRepository from "../../src/domain/repository/orderRepository";
import OrderUseCase from "../../src/domain/useCases/orderUseCase";
import ProductRepositoryMock from "../mock/repository/productRepositoryMock";

describe('OrderUseCase', () => {
  let checkoutRepositoryMock: CheckoutRepository;
  let faturaRepositoryMock: FaturaRepository;
  const createdAt = new Date();
  const productRepositoryMock = new ProductRepositoryMock(createdAt).repository();

  beforeEach(() => {
    checkoutRepositoryMock = {
      geraCobranca: jest.fn().mockResolvedValue({
        id: "1",
        orderId: "1",
        metodoDePagamentoId: "1",
        statusDePagamento: statusDePagamento.AGUARDANDO_PAGAMENTO,
        pagoEm: null,
        qrCode: null,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: null,
      }),
    }
    faturaRepositoryMock = {
      atualizaFatura: jest.fn().mockResolvedValue(null),
      createFatura: jest.fn().mockResolvedValue(null),
      retornaFatura: jest.fn().mockResolvedValue(null),
      atualizaStatusPagamentoFatura: jest.fn().mockResolvedValue(null),
      getFatura: jest.fn().mockResolvedValue({
        id: "1",
        orderId: "1",
        metodoDePagamentoId: "1",
        statusDePagamento: statusDePagamento.AGUARDANDO_PAGAMENTO,
        pagoEm: null,
        qrCode: null,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: null,
      }),
    }
  })

  it('Testa iniciar Order', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      atualizaOrder: jest.fn().mockResolvedValue(null),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue(null),
    }

    const orderInput: OrderInput = {
      clienteId: "", // OBRIGATORIO, CORRIGIR PROJETO
      faturaId: null,
      status: "Rascunho",
      valor: 0,
      retiradoEm: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    const novoOrder = await OrderUseCase.iniciaOrder(orderRepositoryMock, orderInput)
    expect(novoOrder.status).toBe('Rascunho');
    expect(novoOrder.itens).toHaveLength(0)
  });

  it('Testa buscar um Order', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue(null),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const order = await OrderUseCase.buscaOrder(orderRepositoryMock, productRepositoryMock, "1")
    expect(order).toBeTruthy();
  });

  it('Testa retornar itens do Order', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue(null),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue([
        {
          id: "1",
          productId: "1",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          productId: "2",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue(null),
    }

    const itensOrder = await OrderUseCase.retornaItensOrder(orderRepositoryMock, productRepositoryMock, "1")

    expect(itensOrder).toHaveLength(2)
  });

  it('Testa addr itens ao Order', async () => {
    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 3.2,
        itens: [
          {
            id: "1",
            productId: "1",
            orderId: "1",
            quantidade: 1,
            valorUnitario: 1.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
          {
            id: "2",
            productId: "2",
            orderId: "1",
            quantidade: 1,
            valorUnitario: 2.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
        ],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue([
        {
          id: "1",
          productId: "1",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          productId: "2",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const itemOrder1: ItemDoOrderInput = {
      orderId: "1",
      productId: "3",
      quantidade: 1
    }
    const itemOrder2: ItemDoOrderInput = {
      orderId: "1",
      productId: "4",
      quantidade: 1
    }

    await OrderUseCase.addItem(orderRepositoryMock, productRepositoryMock, itemOrder1)
    const pedidiComItem = await OrderUseCase.addItem(orderRepositoryMock, productRepositoryMock, itemOrder2)
    expect(pedidiComItem?.status).toBe('Rascunho');
    expect(pedidiComItem?.itens).toHaveLength(2)
  });

  it('Testa addr item com quantidade zerada ao Order', async () => {
    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue(null),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue([
        {
          id: "1",
          productId: "1",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          productId: "2",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const itemOrder1: ItemDoOrderInput = {
      orderId: "1",
      productId: "2",
      quantidade: 0
    }

    expect(async () => {
      await OrderUseCase.addItem(orderRepositoryMock, productRepositoryMock, itemOrder1)
    }).rejects.toThrow()
  });

  it('Testa realizar order sem itens', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue(null),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const prealizaOrderInput: RealizaOrderInput = {
      orderId: "1",
      clienteId: '1',
      metodoDePagamentoId: ""
    }

    expect(async () => {
      await OrderUseCase.realizaOrder(
        checkoutRepositoryMock,
        faturaRepositoryMock,
        orderRepositoryMock,
        productRepositoryMock,
        prealizaOrderInput)
    }).rejects.toThrow()
  });

  it('Testa mudar staus para -> Aguardando Preparo', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Aguardando pagamento",
        valor: 3.2,
        itens: [
          {
            id: "1",
            productId: "1",
            orderId: "1",
            quantidade: 1,
            valorUnitario: 1.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
          {
            id: "2",
            productId: "2",
            orderId: "1",
            quantidade: 1,
            valorUnitario: 2.1,
            valorTotal: 10,
            observacao: "test",
            createdAt,
            updatedAt: null,
            deletedAt: null,
          },
        ],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue([
        {
          id: "1",
          productId: "1",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 1.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: "2",
          productId: "2",
          orderId: "1",
          quantidade: 1,
          valorUnitario: 2.1,
          valorTotal: 10,
          observacao: "test",
          createdAt,
          updatedAt: null,
          deletedAt: null,
        },
      ]),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Rascunho",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }

    const prealizaOrderInput: RealizaOrderInput = {
      orderId: "1",
      clienteId: '1',
      metodoDePagamentoId: ""
    }


    const realizaOrder = await OrderUseCase.realizaOrder(
      checkoutRepositoryMock,
      faturaRepositoryMock,
      orderRepositoryMock,
      productRepositoryMock,
      prealizaOrderInput)
    expect(realizaOrder?.status).toBe("Aguardando pagamento")
    expect(realizaOrder?.faturaId).toBe("1")

  });

  // TODO -refazer 
  // it('Testa mudar staus para -> Aguardando Preparo', async () => {

  //   const orderRepositoryMock: OrderRepository = {
  //     createOrder: jest.fn().mockResolvedValue(null),
  //     atualizaOrder: jest.fn().mockResolvedValue({
  //       id: "1",
  //       clienteId: "",
  //       faturaId: "1",
  //       status: "Aguardando pagamento",
  //       valor: 3.2,
  //       itens: [],
  //       retiradoEm: null,
  //       createdAt: Date,
  //       deletedAt: null,
  //       updatedAt: null,
  //     }),
  //     listaOrders: jest.fn().mockResolvedValue(null),
  //     retornaProximoOrderFila: jest.fn().mockResolvedValue({
  //       id: "1",
  //       clienteId: "",
  //       faturaId: "1",
  //       status: "Aguardando pagamento",
  //       valor: 3.2,
  //       itens: [],
  //       retiradoEm: null,
  //       createdAt: Date,
  //       deletedAt: null,
  //       updatedAt: null,
  //     }),
  //     removeItem: jest.fn().mockResolvedValue(null),
  //     retornaItem: jest.fn().mockResolvedValue(null),
  //     retornaItensOrder: jest.fn().mockResolvedValue([
  //       {
  //         id: "1",
  //         productId: "1",
  //         orderId: "1",
  //         quantidade: 1,
  //         valorUnitario: 1.1,
  //         valorTotal: 10,
  //         observacao: "test",
  //         createdAt,
  //         updatedAt: null,
  //         deletedAt: null,
  //       },
  //       {
  //         id: "2",
  //         productId: "2",
  //         orderId: "1",
  //         quantidade: 1,
  //         valorUnitario: 2.1,
  //         valorTotal: 10,
  //         observacao: "test",
  //         createdAt,
  //         updatedAt: null,
  //         deletedAt: null,
  //       },
  //     ]),
  //     atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
  //     addItem: jest.fn().mockResolvedValue(null),
  //     retornaOrder: jest.fn().mockResolvedValue({
  //       id: "1",
  //       clienteId: "",
  //       faturaId: null,
  //       status: "Aguardando pagamento",
  //       valor: 0,
  //       itens: [],
  //       retiradoEm: null,
  //       createdAt: Date,
  //       deletedAt: null,
  //       updatedAt: null,
  //     }),
  //   }

  //   const pagamentoInput: PagamentoDTO = {
  //     id: "1",
  //     isPago: true,
  //     valorPagamento: 10,
  //     tipoDePagamento: "",
  //     faturaId: "",
  //     createdAt,
  //     deletedAt: null,
  //     updatedAt: null
  //   }


  //   await OrderUseCase.pagamentoAprovado(
  //     orderRepositoryMock,
  //     faturaRepositoryMock,
  //     pagamentoInput)


  // });

  it('Testa mudar status via id para -> Iniciar Preparo', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Em Preparo",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Aguardando preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }


    const realizaOrder = await OrderUseCase.iniciaPreparo(
      orderRepositoryMock,
      productRepositoryMock,
      "1")
    expect(realizaOrder?.status).toBe("Em Preparo")

  });

  it('Testa mudar status do proximo order da fila para -> Iniciar Preparo', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Em Preparo",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Aguardando preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue(null),
    }


    const realizaOrder = await OrderUseCase.iniciaPreparo(
      orderRepositoryMock,
      productRepositoryMock)
    expect(realizaOrder?.status).toBe("Em Preparo")

  });
  it('Testa mudar status do order para  -> Iniciar Preparo', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Em Preparo",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Aguardando preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue(null),
    }


    const realizaOrder = await OrderUseCase.iniciaPreparo(
      orderRepositoryMock,
      productRepositoryMock)
    expect(realizaOrder?.status).toBe("Em Preparo")

  });

  it('Testa mudar status do order -> Finalizado', async () => {

    const orderRepositoryMock: OrderRepository = {
      createOrder: jest.fn().mockResolvedValue(null),
      atualizaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: "1",
        status: "Pronto",
        valor: 3.2,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
      listaOrders: jest.fn().mockResolvedValue(null),
      retornaProximoOrderFila: jest.fn().mockResolvedValue(null),
      removeItem: jest.fn().mockResolvedValue(null),
      retornaItem: jest.fn().mockResolvedValue(null),
      retornaItensOrder: jest.fn().mockResolvedValue(null),
      atualizaStatusDoOrder: jest.fn().mockResolvedValue(null),
      addItem: jest.fn().mockResolvedValue(null),
      retornaOrder: jest.fn().mockResolvedValue({
        id: "1",
        clienteId: "",
        faturaId: null,
        status: "Em preparo",
        valor: 0,
        itens: [],
        retiradoEm: null,
        createdAt: Date,
        deletedAt: null,
        updatedAt: null,
      }),
    }


    const realizaOrder = await OrderUseCase.finalizaPreparo(
      orderRepositoryMock,
      productRepositoryMock,
      "1")
    expect(realizaOrder?.status).toBe("Pronto")

  });
});
