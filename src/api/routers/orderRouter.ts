import express from "express";
import { Request, Response } from "express";

import InvoiceDatabaseRepository from "gateways/database/repository/invoiceDatabaseRepository";
import OrderDatabaseRepository from "gateways/database/repository/orderDatabaseRepository";
import ProductsDatabaseRepository from "gateways/database/repository/productDatabaseRepository";
import CheckoutProvider from "gateways/payment_service/checkoutRepository";
import { OrderController } from "adapters/controllers/orderController";

import {
  AddItemBody,
  AddItemParams,
  addItemSchema,
  DeliveryOrderParams,
  deliveryOrderSchema,
  EndPreparingParams,
  endPreparingSchema,
  InitOrderPayload,
  initOrderSchema,
  InitPreparingParams,
  initPreparingSchema,
  ListOrdersQuery,
  listOrdersSchema,
  ProcessOrderParams,
  processOrderSchema,
  RemoveItemParams,
  removeItemSchema,
  paymentStatusSchema,
  StatusOrderParams,
} from "./schemas/orderRouter.schema";
import { validate } from "./utils";

const orderRouter = express.Router({});

const checkoutRepository = new CheckoutProvider();
const dbOrdersRepository = new OrderDatabaseRepository();
const dbProductRepository = new ProductsDatabaseRepository();
const dbInvoiceRepository = new InvoiceDatabaseRepository();

orderRouter.post(
  "/:id/add_item",
  validate(addItemSchema),
  async (
    req: Request<AddItemParams, AddItemBody>,
    res: Response
  ) => {
    try {
      const { body, params } = req;

      const order = await OrderController.addItem(
        dbOrdersRepository,
        dbProductRepository,
        {
          ...body,
          orderId: params.id,
        }
      );

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.delete(
  "/:id/remove_item/:idItem",
  validate(removeItemSchema),
  async (req: Request<RemoveItemParams>, res: Response) => {
    try {
      const { params } = req;

      const order = await OrderController.removeItem(
        dbOrdersRepository,
        dbProductRepository,
        {
          orderId: params.id,
          itemId: params.idItem,
        }
      );

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.post(
  "/init",
  validate(initOrderSchema),
  async (req: Request<unknown, InitOrderPayload>, res: Response) => {
    try {
      const { body } = req;

      const orderCreated = await OrderController.initOrder(
        dbOrdersRepository,
        body
      );

      return res.status(201).json({
        status: "success",
        message: orderCreated,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.patch(
  "/process/:id",
  validate(processOrderSchema),
  async (
    req: Request<ProcessOrderParams>,
    res: Response
  ) => {
    try {
      const { params, body } = req;

      const orderCreated = await OrderController.processOrder(
        checkoutRepository,
        dbInvoiceRepository,
        dbOrdersRepository,
        dbProductRepository,
        {
          orderId: params.id
        }
      );

      return res.status(201).json({
        status: "success",
        message: orderCreated,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.get(
  "/queue/",
  validate(listOrdersSchema),
  async (req: Request<unknown, unknown, ListOrdersQuery>, res: Response) => {
    try {
      const { query } = req;

      let status: Array<string> = [];
      const customerId = query.customerId as string;
      if (query?.status && typeof query.status === "string") {
        status = query.status.split(",");
      }

      const orders = await OrderController.listOrders(
        dbOrdersRepository,
        status,
        customerId
      );

      return res.status(200).json({
        status: "success",
        message: orders,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.patch(
  "/prepare/:id",
  validate(initPreparingSchema),
  async (req: Request<InitPreparingParams>, res: Response) => {
    try {
      const { orderId } = req.query;

      const order = await OrderController.initPreparing(
        dbOrdersRepository,
        dbProductRepository,
        orderId as string
      );

      if (order) {
        return res.status(201).json({
          status: "success",
          message: order,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Order queue empty",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.patch(
  "/complete/:id",
  validate(endPreparingSchema),
  async (req: Request<EndPreparingParams>, res: Response) => {
    try {
      const { params } = req;

      const order = await OrderController.completePreparing(
        dbOrdersRepository,
        dbProductRepository,
        params.id
      );

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.patch(
  "/delivery/:id",
  validate(deliveryOrderSchema),
  async (req: Request<DeliveryOrderParams>, res: Response) => {
    try {
      const { params } = req;

      const order = await OrderController.deliveryOrder(
        dbOrdersRepository,
        dbProductRepository,
        params.id
      );

      return res.status(201).json({
        status: "success",
        message: order,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.get(
  "/",
  validate(listOrdersSchema),
  async (req: Request<unknown, unknown, ListOrdersQuery>, res: Response) => {
    try {
      const { query } = req;

      let status: Array<string> = [];
      const customerId = query.customerId as string;
      if (query?.status && typeof query.status === "string") {
        status = query.status.split(",");
      }

      const orders = await OrderController.listOrders(
        dbOrdersRepository,
        status,
        customerId
      );

      return res.status(200).json({
        status: "success",
        message: orders,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

orderRouter.get(
  "/:id/payment_status",
  validate(paymentStatusSchema),
  async (req: Request<StatusOrderParams>, res: Response) => {
    try {
      const { params } = req;
      const { id: idOrder } = params;

      const paymentStatusOrder = await OrderController.paymentStatus(
        dbOrdersRepository,
        dbInvoiceRepository,
        idOrder
      );

      if (paymentStatusOrder) {
        return res.status(200).json({
          status: "success",
          message: paymentStatusOrder,
        });
      }

      return res.status(404).json({
        status: "error",
        message: "Order or invoice not found",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

export default orderRouter;