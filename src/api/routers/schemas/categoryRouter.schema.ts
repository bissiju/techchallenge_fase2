import { z } from "zod";

/** Create Category */
export const CreateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
  }),
});

export type CreateCategoryPayload = z.infer<typeof CreateCategorySchema>;

/** List Category */
export const ListCategorySchema = z.object({});
export type ListCategoryPayload = z.infer<typeof ListCategorySchema>;

/** view Category */
export const ViewCategorySchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "categoryId is required",
        invalid_type_error: "categoryId invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
  }),
});

export type ViewCategoryPayload = z.infer<typeof ViewCategorySchema>;
export type ViewCategoryParams = ViewCategoryPayload["params"];

/** Delete Category */
export const DeleteCategorySchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "categoryId is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
  }),
});

export type DeleteCategoryPayload = z.infer<typeof DeleteCategorySchema>;
export type DeleteCategoryParams = DeleteCategoryPayload["params"];

/** Edit Category */
export const EditCategorySchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "categoryId is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: "name da category is required",
        invalid_type_error: "name must be a string",
      })
  }),
});

export type EditCategoryPayload = z.infer<typeof EditCategorySchema>;
export type EditCategoryBody = EditCategoryPayload["body"];
export type EditCategoryParams = EditCategoryPayload["params"];