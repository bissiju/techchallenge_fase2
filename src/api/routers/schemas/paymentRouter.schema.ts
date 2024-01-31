import { z } from "zod";

export const GetPaymentsSchema = z.object({
  params: z.object({}),
  body: z.object({
    invoiceId: z
      .string({
        required_error: "invoiceId is required",
        invalid_type_error: "invoiceId invalid",
      })
      .uuid({ message: "id must be a valid UUID" }),
    isPaid: z
    .boolean({
      required_error: "O status do payment is required",
      invalid_type_error: "status invalid",
    }),
    paymentValue: z
    .number({
      required_error: "O value do payment is required",
      invalid_type_error: "value invalid",
    })
    .gte(0.01, { message: "value can not be empty" }),
    payment_method: z
    .string({
      required_error: "payment_method is required",
      invalid_type_error: "payment_method invalid",
    })
  }),
});

export type GetPaymentsPayload = z.infer<typeof GetPaymentsSchema>;
export type GetPaymentsBody = GetPaymentsPayload["body"];
export type GetPaymentsParams = GetPaymentsPayload["params"];
