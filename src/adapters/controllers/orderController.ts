import { PaymentStatus } from "~domain/entity/invoice";
import { ProcessOrderInput } from "~domain/entity/types/orderService.type";
import { OrderDTO, OrderInput } from "~domain/entity/types/orderType";
import CheckoutRepository from "~domain/repository/checkoutRepository";
import InvoiceRepository from "~domain/repository/invoiceRepository";
import OrderRepository, {
  AddItemInput,
  RemoveItemInput,
} from "~domain/repository/orderRepository";
import ProductRepository from "~domain/repository/productRepository";
import OrderUseCase from "~domain/use_case/orderUseCase";

export class OrderController {
  static async initOrder(
    orderRepository: OrderRepository,
    order: OrderInput
  ): Promise<OrderDTO | null> {
    const orderCreated = await OrderUseCase.initOrder(
      orderRepository,
      order
    );
    return orderCreated;
  }

  static async processOrder(
    checkoutRepository: CheckoutRepository,
    invoiceRepository: InvoiceRepository,
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    processOrderInput: ProcessOrderInput
  ): Promise<OrderDTO | null> {
    return await OrderUseCase.processOrder(
      checkoutRepository,
      invoiceRepository,
      orderRepository,
      productRepository,
      processOrderInput
    );
  }

  static async initPreparing(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    id: string
  ): Promise<OrderDTO | null> {
    return await OrderUseCase.initPreparing(
      orderRepository,
      productRepository,
      id
    );
  }

  static async completePreparing(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    id: string
  ): Promise<OrderDTO> {
    return await OrderUseCase.completePreparing(
      orderRepository,
      productRepository,
      id
    );
  }

  static async addItem(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    addItemInput: AddItemInput
  ): Promise<OrderDTO | null> {
    return await OrderUseCase.addItem(
      orderRepository,
      productRepository,
      addItemInput
    );
  }

  static async removeItem(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    removeItemInput: RemoveItemInput
  ): Promise<OrderDTO | null> {
    return await OrderUseCase.removeItem(
      orderRepository,
      productRepository,
      removeItemInput
    );
  }

  static async deliveryOrder(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    id: string
  ): Promise<OrderDTO | null> {
    return await OrderUseCase.deliveryOrder(
      orderRepository,
      productRepository,
      id
    );
  }

  static async listOrders(
    orderRepository: OrderRepository,
    status: Array<string>,
    customerId: string
  ): Promise<OrderDTO[] | null> {
    return await OrderUseCase.listOrders(
      orderRepository,
      status,
      customerId
    );
  }

  static async paymentStatus(
    orderRepository: OrderRepository,
    invoiceRepository: InvoiceRepository,
    orderId: string
  ): Promise<PaymentStatus | null | undefined> {
    return await OrderUseCase.paymentStatus(
      orderRepository,
      invoiceRepository,
      orderId
    );
  }
}
