import express from "express";
import { Request, Response } from "express";

import DBProductsRepository from "gateways/database/repository/productDatabaseRepository";
import { ProductController } from "adapters/controllers/productController";

import { AddItemBody, AddItemParams } from "./schemas/orderRouter.schema";
import {
  CreateProductBody,
  CreateProductSchema,
  DeleteProductBody,
  DeleteProductSchema,
  EditProductBody,
  EditProductParams,
  EditProductSchema,
  ListProductParams,
  ListProductSchema,
  ViewProductParams,
  ViewProductSchema
} from "./schemas/productRouter.schema";
import { validate } from "./utils";

const productRouter = express.Router();

const dbProductsRepository = new DBProductsRepository();

productRouter.post("/",
  validate(CreateProductSchema),
  async (
    req: Request<unknown, CreateProductBody>,
    res: Response
  ) => {
    try {
      const product = req.body;

      const productCreatedo = await ProductController.createProduct(dbProductsRepository, product);
      return res.status(201).json({
        status: "success",
        message: productCreatedo,
      });
    } catch (err: any) {
      if (err.message === "category_not_found") {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      }

      if (err.message === "price_zerado") {
        return res.status(400).json({
          status: "error",
          message: "price deve ser maior que zero!",
        });
      }
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

productRouter.get("/",
  authenticate(UserType.CUSTOMER),
  validate(ListProductSchema),
  async (
    req: Request<ListProductParams, unknown>,
    res: Response
  ) => {
    try {
      const categoryId = req.query.categoryId;
      const query: {
        categoryId?: string;
      } = {};

      if (categoryId) {
        query.categoryId = categoryId as string;
      }

      const products = await ProductController.listProducts(dbProductsRepository, query);

      return res.status(200).json({
        status: "success",
        products,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

productRouter.get("/:id",
  authenticate(UserType.CUSTOMER),
  validate(ViewProductSchema),
  async (
    req: Request<ViewProductParams, unknown>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const product = await ProductController.viewProduct(dbProductsRepository, id);

      if (product) {
        return res.status(200).json({
          status: "success",
          product,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

productRouter.delete("/:id",
  validate(DeleteProductSchema),
  async (
    req: Request<DeleteProductBody, unknown>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const productDeletedo = await ProductController.deleteProduct(dbProductsRepository, id);

      if (productDeletedo > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

productRouter.put("/:id",
  validate(EditProductSchema),
  async (
    req: Request<EditProductParams, EditProductBody>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const product = req.body;

      const productUpdatedo = await ProductController.editaProduct(dbProductsRepository,
        id,
        product
      );

      if (productUpdatedo) {
        return res.status(200).json({
          status: "success",
          message: productUpdatedo,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    } catch (err: any) {
      if (err.message === "category_not_found") {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      }

      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

export default productRouter;