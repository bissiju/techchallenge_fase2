import express from "express";
import { Request, Response } from "express";

import InvoiceDatabaseRepository from "gateways/database/repository/invoiceDatabaseRepository";
import PaymentDatabaseRepository from "gateways/database/repository/paymentDatabaseRepository";
import OrderDatabaseRepository from "gateways/database/repository/orderDatabaseRepository";
import { PaymentController } from "adapters/controllers/paymentController";

import { GetPaymentsPayload, GetPaymentsSchema } from "./schemas/paymentRouter.schema";
import { validate } from "./utils";

const paymentRouter = express.Router();

const dbPaymentRepository = new PaymentDatabaseRepository();
const orderRepository = new OrderDatabaseRepository()
const invoiceRepository = new InvoiceDatabaseRepository()

paymentRouter.post("/",
  validate(GetPaymentsSchema),
  async (
    req: Request<unknown, GetPaymentsPayload>,
    res: Response
  ) => {
    try {
      const { body } = req;
      const paymentCreated = await PaymentController.getPayment(
        invoiceRepository,
        orderRepository,
        dbPaymentRepository,
        body);
      return res.status(201).json({
        status: "success",
        message: paymentCreated,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  })

export default paymentRouter;