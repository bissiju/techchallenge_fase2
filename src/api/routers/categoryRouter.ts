import express from "express";
import { Request, Response } from "express";

import DBCategoriesRepository from "gateways/database/repository/categoryDatabaseRepository";
import { CategoryController } from "adapters/controllers/categoryController";

import {
  CreateCategoryPayload,
  CreateCategorySchema,
  DeleteCategoryParams,
  DeleteCategorySchema,
  EditCategoryParams,
  EditCategoryPayload,
  EditCategorySchema,
  ListCategoryPayload,
  ListCategorySchema,
  ViewCategoryParams,
  ViewCategorySchema,
} from "./schemas/categoryRouter.schema";
import { validate } from "./utils";

const categoryRouter = express.Router();

const dbCategoriesRepository = new DBCategoriesRepository();

categoryRouter.post("/",
  validate(CreateCategorySchema),
  async (req: Request<unknown, CreateCategoryPayload>, res: Response) => {
    try {
      const category = req.body;

      const categoryCreatedo = await CategoryController.createCategory(dbCategoriesRepository,
        category
      );
      return res.status(201).json({
        status: "success",
        message: categoryCreatedo,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

categoryRouter.get("/",
  validate(ListCategorySchema),
  async (req: Request<unknown, ListCategoryPayload>, res: Response) => {
    try {
      const categories = await CategoryController.listCategories(dbCategoriesRepository);

      return res.status(200).json({
        status: "success",
        categories,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

categoryRouter.get("/:id",
  validate(ViewCategorySchema),
  async (req: Request<ViewCategoryParams, unknown>, res: Response) => {
    try {
      const { id } = req.params;

      const category = await CategoryController.viewCategory(dbCategoriesRepository,id);

      if (category) {
        return res.status(200).json({
          status: "success",
          category,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

categoryRouter.delete("/:id", 
  validate(DeleteCategorySchema),
  async (req: Request<DeleteCategoryParams, unknown>, res: Response) => {
    try {
      const { id } = req.params;

      const categoryDeletedo = await CategoryController.deleteCategory(dbCategoriesRepository, id);

      if (categoryDeletedo > 0) {
        return res.status(200).json({
          status: "success",
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

categoryRouter.put("/:id",
  validate(EditCategorySchema), 
  async (req: Request<EditCategoryParams, EditCategoryPayload>, res: Response) => {
    try {
      const { id } = req.params;
      const category = req.body;

      const categoryUpdateda = await CategoryController.editCategory(dbCategoriesRepository,
        id,
        category
      );

      if (categoryUpdateda) {
        return res.status(200).json({
          status: "success",
          message: categoryUpdateda,
        });
      }
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
);

export default categoryRouter;