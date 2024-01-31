/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { paymentStatus } from "~domain/entity/invoice";
import ItemOrder from "~domain/entity/itemOrder";
import Order from "~domain/entity/order";
import Product from "~domain/entity/product";
import { ItemOrderInput } from "~domain/entity/types/itemOrderType";
import { PaymentDTO } from "~domain/entity/types/paymentType";
import {
  OrderDTO,
  OrderInput,
  statusOrder,
} from "~domain/entity/types/orderType";
import CheckoutRepository from "~domain/repository/checkoutRepository";
import InvoiceRepository from "~domain/repository/invoiceRepository";
import OrderRepository from "~domain/repository/orderRepository";
import ProductRepository from "~domain/repository/productRepository";

import {
  ProcessOrderInput,
  RemoveItemInput,
} from "../entity/types/orderService.type";

import InvoiceUseCase from "./invoiceUseCase";

export default class OrderUseCase {
  static async findOrder(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    orderId: string
  ) {
    const itemsAtuais = await OrderUseCase.viewItemsOrder(
      orderRepository,
      productRepository,
      orderId
    );
    const order = await orderRepository.viewOrder(orderId);

    if (order) {
      return new Order(order, itemsAtuais);
    }

    return null;
  }

  static async initOrder(
    orderRepository: OrderRepository,
    orderInput: OrderInput
  ): Promise<OrderDTO> {
    const order = new Order(orderInput);
    return orderRepository.createOrder(order);
  }

  static async processOrder(
    checkoutRepository: CheckoutRepository,
    invoiceRepository: InvoiceRepository,
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    processOrderInput: ProcessOrderInput
  ): Promise<OrderDTO | null> {
    const order = await OrderUseCase.findOrder(
      orderRepository,
      productRepository,
      processOrderInput.orderId
    );

    if (!order) {
      throw new Error("Order not found");
    }

    order.processOrder();

    const invoice = await InvoiceUseCase.generateInvoice(
      order,
      invoiceRepository
    );
    const invoiceUpdated = await checkoutRepository.generateBilling(
      invoice,
      invoiceRepository
    );
    order.invoiceId = invoiceUpdated.id;

    return orderRepository.updateOrder(order);
  }

  static async viewNextOrderQueue(
    orderRepository: OrderRepository,
    productRepository: ProductRepository
  ) {
    const nextOrder = await orderRepository.viewNextOrderQueue();
    if (nextOrder) {
      const itemsAtuais = await OrderUseCase.viewItemsOrder(
        orderRepository,
        productRepository,
        nextOrder.id
      );
      return new Order(nextOrder, itemsAtuais);
    }

    return null;
  }

  static async initPreparing(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    orderId?: string
  ): Promise<OrderDTO | null> {
    const order = orderId
      ? await OrderUseCase.findOrder(
        orderRepository,
        productRepository,
        orderId
      )
      : await OrderUseCase.viewNextOrderQueue(
        orderRepository,
        productRepository
      );

    if (order) {
      order.preparing();
      return orderRepository.updateOrder(order);
    }

    return null;
  }

  static async completePreparing(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    orderId: string
  ): Promise<OrderDTO> {
    const order = await OrderUseCase.findOrder(
      orderRepository,
      productRepository,
      orderId
    );

    if (!order) {
      throw new Error("Order not found");
    }

    order.completed();

    return orderRepository.updateOrder(order);
  }

  static async deliveryOrder(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    orderId: string
  ): Promise<OrderDTO> {
    const order = await OrderUseCase.findOrder(
      orderRepository,
      productRepository,
      orderId
    );

    if (!order) {
      throw new Error("Order not found");
    }

    order.delivered();

    return orderRepository.updateOrder(order);
  }

  static async addItem(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    itemOrderInput: ItemOrderInput
  ): Promise<OrderDTO | null> {
    const order = await OrderUseCase.findOrder(
      orderRepository,
      productRepository,
      itemOrderInput.orderId as string
    );

    if (!order) {
      throw new Error("Order not found");
    }

    const productFound = await productRepository.viewProduct(
      itemOrderInput.productId as string
    );

    if (!productFound) {
      throw new Error("Product not found");
    }

    const product = new Product(productFound);
    itemOrderInput.itemValue = product.viewPrice();
    itemOrderInput.productId = product.id;

    const novoItem = new ItemOrder(itemOrderInput);

    order.addItem(novoItem);

    return orderRepository.updateOrder(order);
  }

  static async viewItemsOrder(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    orderId: string
  ): Promise<ItemOrder[] | null> {
    const itemsOrder = await orderRepository.viewItemsOrder(orderId);

    if (itemsOrder) {
      const items = itemsOrder?.map(async (item) => {
        const productFound = await productRepository.viewProduct(
          item.productId
        );

        if (!productFound) {
          throw new Error("Product not found");
        }

        const product = new Product(productFound);
        item.itemValue = product.viewPrice();
        item.productId = product.id;
        return new ItemOrder(item);
      });

      return await Promise.all(items);
    }

    return null;
  }

  static async removeItem(
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    removeItemInput: RemoveItemInput
  ): Promise<OrderDTO | null> {
    const order = await OrderUseCase.findOrder(
      orderRepository,
      productRepository,
      removeItemInput.orderId as string
    );

    if (!order) {
      throw new Error("Order not found");
    }

    order.removeItem(removeItemInput.itemId);

    return orderRepository.updateOrder(order);
  }

  static async listOrders(
    orderRepository: OrderRepository,
    status?: Array<string>,
    customerId?: string
  ): Promise<Array<OrderDTO> | null> {
    return orderRepository.listOrders(status, customerId);
  }

  static async paymentStatus(
    orderRepository: OrderRepository,
    invoiceRepository: InvoiceRepository,
    orderId: string
  ) {
    const order = await orderRepository.viewOrder(orderId);

    if (order) {
      const orderEntity = new Order(order);

      if (!orderEntity.invoiceId) {
        return null;
      }

      const invoice = await invoiceRepository.viewInvoice(
        orderEntity.invoiceId
      );

      return invoice?.paymentStatus;
    }

    return null;
  }

  static async paymentDenied(
    orderRepository: OrderRepository,
    invoiceRepository: InvoiceRepository,
    payment: PaymentDTO
  ) {
    const invoice = await invoiceRepository.pegaInvoice(payment.invoiceId);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const order = await orderRepository.viewOrder(invoice.orderId);

    if (order?.status !== paymentStatus.PAYMENT_PENDING) {
      throw new Error(
        `Order payment status already updated: ${order?.status}`
      );
    }

    invoiceRepository.updateStatusPaymentInvoice(
      invoice.id,
      paymentStatus.PAYMENT_ERROR
    );
    orderRepository.updateStatusOrder(order!.id, statusOrder.FAILED);
  }

  static async paymentApproved(
    orderRepository: OrderRepository,
    invoiceRepository: InvoiceRepository,
    payment: PaymentDTO
  ) {
    const invoice = await invoiceRepository.pegaInvoice(payment.invoiceId);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const order = await orderRepository.viewOrder(invoice.orderId);

    if (order?.status !== paymentStatus.PAYMENT_PENDING) {
      throw new Error(
        `Order payment status already updated: ${order?.status}`
      );
    }

    if (order!.value <= payment.paymentValue) {
      invoiceRepository.updateStatusPaymentInvoice(
        invoice.id,
        paymentStatus.PAYMENT_APPROVED
      );
      orderRepository.updateStatusOrder(
        order!.id,
        statusOrder.PREPARING_PENDING
      );
    } else {
      invoiceRepository.updateStatusPaymentInvoice(
        invoice.id,
        paymentStatus.PAYMENT_ERROR
      );
      orderRepository.updateStatusOrder(order!.id, statusOrder.FAILED);
    }
  }
}
