import { ItemOrderDTO } from "./itemOrderType";

export interface OrderInput {
  id?: string;
  customerId: string;
  invoiceId: string | null;
  status: StatusOrder;
  value: number;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export const statusOrder = {
  STARTED: "started",
  PAYMENT_PENDING: "payment_pending",
  FAILED: "order_failed",
  PREPARING_PENDING: "preparing_pending",
  PREPARING: "preparing",
  PREPARING_COMPLETED: "preparing_completed",
  DELIVERED: "delivered",
} as const;

export type StatusOrder =
  (typeof statusOrder)[keyof typeof statusOrder];

export interface OrderDTO {
  id: string;
  customerId: string;
  invoiceId: string | null;
  status: StatusOrder;
  value: number;
  items?: ItemOrderDTO[];
  deliveredAt: Date | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}