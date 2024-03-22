import express from "express";
import { Request, Response } from "express";

import DBCustomersRepository from "gateways/database/repository/customerDatabaseRepository";
import { CustomerController } from "adapters/controllers/customerController";
import { CreateCustomerBody, CreateCustomerSchema, ViewCustomerBody, ViewCustomerSchema, ListCustomersSchema } from "./schemas/customerRouter.schema";
import { validate } from "./utils";

const customerRouter = express.Router();

const dbCustomerRepository = new DBCustomersRepository();

customerRouter.post("/",
  validate(CreateCustomerSchema),
  async (
    req: Request<unknown, CreateCustomerBody>,
    res: Response
  ) => {
    try {
      const customer = req.body;

      const customerCreated = await CustomerController.createCustomer(dbCustomerRepository, customer);
      return res.status(201).json({
        status: "success",
        message: customerCreated,
      });
    } catch (err: any) {
      if (err.message === "customer_duplicated") {
        return res.status(400).json({
          status: "error",
          message: "Email or CPF already used."
        })
      }
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

);

customerRouter.get("/",
  validate(ListCustomersSchema),
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const customers = await CustomerController.listCustomers(dbCustomerRepository);

      return res.status(200).json({
        status: "success",
        customers,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

customerRouter.post("/search",
  validate(ViewCustomerSchema),
  async (
    req: Request<unknown, ViewCustomerBody>,
    res: Response
  ) => {
    try {
      const { body } = req;

      const customer = await CustomerController.viewCustomer(dbCustomerRepository, body.cpf);

      if (customer) {
        return res.status(200).json({
          status: "success",
          customer,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });

    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
);

export default customerRouter;