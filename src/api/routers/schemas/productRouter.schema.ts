import { z } from "zod";

/** Create Product */
export const CreateProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "id invalid",
      }),
    price: z
      .number({
        required_error: "price is required",
        invalid_type_error: "price must be a number",
      })
      .positive({ message: "value can not be empty" }),
    description: z
      .string(),
    categoryId: z
      .string({
        required_error: "categoryId is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "categoryId must be a valid UUID" }),
  }),
});

export type CreateProductPayload = z.infer<typeof CreateProductSchema>;
export type CreateProductBody = CreateProductPayload["body"];


/** List Product */
export const ListProductSchema = z.object({
  params: z.object({
    categoryId: z
      .string({
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id must be a valid UUID" })
      .optional(),
  }),
});
export type ListProductPayload = z.infer<typeof ListProductSchema>;
export type ListProductParams = ListProductPayload["params"];

/** view Product */
export const ViewProductSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "productId is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
  }),
});

export type ViewProductPayload = z.infer<typeof ViewProductSchema>;
export type ViewProductParams = ViewProductPayload["params"];


/** Delete Product */
export const DeleteProductSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "productId is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
  }),
});

export type DeleteProductPayload = z.infer<typeof DeleteProductSchema>;
export type DeleteProductBody = DeleteProductPayload["params"];

/** Edit Product */
export const EditProductSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O Id do product is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "id invalid",
      })
      .optional(),
    price: z
      .number({
        required_error: "price is required",
        invalid_type_error: "id deve ser um numer",
      })
      .optional(),
    description: z
      .string()
      .optional(),
    categoryId: z
      .string({
        required_error: "categoryId is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "categoryId must be a valid UUID" })
  }),
});

export type EditProductPayload = z.infer<typeof EditProductSchema>;
export type EditProductParams = EditProductPayload["params"];
export type EditProductBody = EditProductPayload["body"];