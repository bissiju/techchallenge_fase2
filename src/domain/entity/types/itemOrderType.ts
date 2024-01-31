export interface ItemOrderInput {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number;
  itemValue?: number;
  note?: string | null;
  createdAt?: Date;
  deletedAt?: Date | null;
  updatedAt?: Date | null;
}

export type ItemsOrder = Array<ItemOrderInput>;

export interface ItemOrderDTO {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  itemValue: number;
  totalValue: number;
  note: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
} 