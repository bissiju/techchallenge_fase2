import { z } from "zod";

/** Init Order */
export const initOrderSchema = z.object({
  body: z.object({
    customerId: z
      .string()
      .uuid({ message: "id do customer must be a valid UUID" })
      .optional(),
  }),
});

export type InitOrderPayload = z.infer<typeof initOrderSchema>;

/** Add Item */
export const addItemSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "orderId is required",
        invalid_type_error: "orderId must be a string",
      })
      .uuid({ message: "orderId must be a valid UUID" }),
  }),
  body: z.object({
    productId: z
      .string({
        required_error: "id do product is required",
        invalid_type_error: "id invalid",
      })
      .uuid({ message: "id do product must be a valid UUID" }),
    quantity: z
      .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
      })
      .positive({ message: "Quantity deve ser maior que zero" }),
    note: z
      .string({ invalid_type_error: "Note must be a string" })
      .optional(),
  }),
});

export type AddItemPayload = z.infer<typeof addItemSchema>;
export type AddItemBody = AddItemPayload["body"];
export type AddItemParams = AddItemPayload["params"];

/** Remove Item */
export const removeItemSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "orderId is required",
        invalid_type_error: "orderId must be a string",
      })
      .uuid({ message: "orderId must be a valid UUID" }),
    idItem: z
      .string({
        required_error: "id do item is required",
        invalid_type_error: "id item must be a string",
      })
      .uuid({ message: "id do item must be a valid UUID" }),
  }),
});

export type RemoveItemPayload = z.infer<typeof removeItemSchema>;
export type RemoveItemParams = RemoveItemPayload["params"];

/** Process Order */
export const processOrderSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "orderId is required",
        invalid_type_error: "orderId must be a string",
      })
      .uuid({ message: "orderId must be a valid UUID" }),
  }),
});

export type ProcessOrderPayload = z.infer<typeof processOrderSchema>;
export type ProcessOrderParams = ProcessOrderPayload["params"];

/** Init Preparing */
export const initPreparingSchema = z.object({});

export type InitPreparingParams = z.infer<typeof initPreparingSchema>;

/** End Preparing */
export const endPreparingSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "orderId is required",
        invalid_type_error: "orderId must be a string",
      })
      .uuid({ message: "orderId must be a valid UUID" }),
  }),
});

export type EndPreparingPayload = z.infer<typeof endPreparingSchema>;
export type EndPreparingParams = EndPreparingPayload["params"];

/** Delivery Order */
export const deliveryOrderSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "orderId is required",
        invalid_type_error: "orderId must be a string",
      })
      .uuid({ message: "orderId must be a valid UUID" }),
  }),
});

export type DeliveryOrderPayload = z.infer<typeof deliveryOrderSchema>;
export type DeliveryOrderParams = DeliveryOrderPayload["params"];

/** List Orders */
export const listOrdersSchema = z.object({
  query: z.object({
    status: z
      .string({
        invalid_type_error: "status must be a string",
      })
      .optional(),
  }),
});

export type ListOrdersPayload = z.infer<typeof listOrdersSchema>;
export type ListOrdersQuery = ListOrdersPayload["query"];

/** Status de Payment */
export const paymentStatusSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "orderId is required",
        invalid_type_error: "orderId must be a string",
      })
      .uuid({ message: "orderId must be a valid UUID" }),
  }),
});

export type StatusOrderPayload = z.infer<typeof paymentStatusSchema>;
export type StatusOrderParams = StatusOrderPayload["params"];