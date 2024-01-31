export type InitOrderInput = {
  customerId?: string | null;
};

export type ProcessOrderInput = {
  orderId: string;
};

export type AddItemInput = {
  orderId: string;
  productId: string;
  quantity: number;
  note?: string | null;
};

export type RemoveItemInput = {
  orderId: string;
  itemId: string;
};
