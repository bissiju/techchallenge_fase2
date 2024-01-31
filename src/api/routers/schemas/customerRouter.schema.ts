import { z } from "zod";


/** Create customer */
export const CreateCustomerSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be a string",
      })
      .optional(),
    cpf: z
      .string({
        invalid_type_error: "cpf must be a string",
      })
      .optional(),
    email: z
      .string({ invalid_type_error: "email must be a string" })
      .optional(),
  }),
});
export type CreateCustomerPayload = z.infer<typeof CreateCustomerSchema>;
export type CreateCustomerBody = CreateCustomerPayload["body"];


/** List customers */
export const ListCustomersSchema = z.object({
  params: z.object({}),
  body: z.object({}),
});
export type ListCustomersPayload = z.infer<typeof ListCustomersSchema>;
export type ListCustomersParams = ListCustomersPayload["params"];
export type ListCustomersBody = ListCustomersPayload["body"];

/** view customer */
export const ViewCustomerSchema = z.object({
  body: z.object({
    cpf: z
      .string({
        required_error: "cpf is required",
        invalid_type_error: "cpf must be a string",
      }),
  }),
});
export type ViewCustomerPayload = z.infer<typeof ViewCustomerSchema>;
export type ViewCustomerBody = ViewCustomerPayload["body"];
