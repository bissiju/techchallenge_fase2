export const paymentStatus = {
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_ERROR: "payment_error",
  PAYMENT_APPROVED: "payment_approved",
  PAYMENT_DENIED: "payment_denied",
} as const;

export type PaymentStatus =
  (typeof paymentStatus)[keyof typeof paymentStatus];

export interface Invoice {
  id: string;
  orderId: string;
  paymentStatus: PaymentStatus;
  paidAt: Date | null;
  qrCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
