import Order from "~domain/entity/order";
import { ItemOrderDTO } from "~domain/entity/types/itemOrderType";
import { OrderDTO, StatusOrder } from "~domain/entity/types/orderType";

export type CreateOrderInput = {
  customerId?: string | null;
  value: number;
  status: StatusOrder;
};

export type UpdateOrderInput = {
  id: string;
  status?: StatusOrder;
  deliveredAt?: Date;
  invoiceId?: string;
};

export type AddItemInput = {
  orderId: string;
  productId: string;
  quantity: number;
  itemValue: number;
  totalValue: number;
  note?: string | null;
};

export type RemoveItemInput = {
  orderId: string;
  itemId: string;
};

export type ViewItemInput = {
  id: string;
};

export default interface OrderRepository {
  createOrder(order: OrderDTO): Promise<OrderDTO>;
  updateOrder(order: Order): Promise<OrderDTO>;
  updateStatusOrder(id: string, statusOrder: StatusOrder): Promise<OrderDTO>;
  addItem(addItemInput: AddItemInput): Promise<OrderDTO | null>;
  viewOrder(id: string): Promise<OrderDTO | null>;
  listOrders(status?: Array<string>, customerId?: string): Promise<Array<OrderDTO> | null>;
  viewNextOrderQueue(): Promise<OrderDTO | null>;
  removeItem(removeItemInput: RemoveItemInput): Promise<OrderDTO | null>;
  viewItem(id: string): Promise<ItemOrderDTO | null>;
  viewItemsOrder(orderId: string): Promise<ItemOrderDTO[] | null>;
}
