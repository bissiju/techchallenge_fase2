/* eslint-disable @typescript-eslint/no-non-null-assertion */
import sequelize, { Op, WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { ItemOrderDTO } from "~domain/entity/types/itemOrderType";
import {
  OrderDTO,
  StatusOrder,
  statusOrder,
} from "~domain/entity/types/orderType";
import OrderRepository, {
  AddItemInput,
  RemoveItemInput,
} from "~domain/repository/orderRepository";

import InvoiceModel from "../models/invoiceModel";
import ItemOrderModel from "../models/itemOrderModel";
import OrderModel from "../models/orderModel";

class OrderDatabaseRepository implements OrderRepository {
  async viewItemsOrder(
    orderId: string
  ): Promise<ItemOrderDTO[] | null> {
    try {
      return await ItemOrderModel.findAll({
        where: { orderId },
      });
    } catch (err: any) {
      console.error("Error creating order: ", err);
      throw new Error(err);
    }
  }
  async createOrder(order: OrderDTO): Promise<OrderDTO> {
    try {
      return (await OrderModel.create(order)) as OrderDTO;
    } catch (err: any) {
      console.error("Error creating order: ", err);
      throw new Error(err);
    }
  }

  async updateStatusOrder(
    id: string,
    statusOrder: StatusOrder
  ): Promise<OrderDTO> {
    try {
      const order = await OrderModel.findByPk(id);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      order!.status = statusOrder;
      await order?.save();
      return order as OrderDTO;
    } catch (err: any) {
      console.error("Error updating order status: ", err);
      throw new Error(err);
    }
  }

  async updateOrder(order: OrderDTO): Promise<OrderDTO> {
    try {
      const orderAtual = await OrderModel.findByPk(order.id, {
        include: ["items"],
      });

      if (order.invoiceId) {
        orderAtual!.invoiceId = order.invoiceId;
      }

      const idsPostsExistsntes = orderAtual?.items?.map(
        (item) => item.id
      ) as [];

      if (idsPostsExistsntes) {
        const idsPostsParaRemover = idsPostsExistsntes?.filter(
          (id) => !order?.items?.some((item) => item.id === id)
        );
        await ItemOrderModel.destroy({ where: { id: idsPostsParaRemover } });
      }

      if (order.items) {
        await ItemOrderModel.bulkCreate(order.items, {
          updateOnDuplicate: ["id"],
        });
      }

      if (orderAtual) {
        Object.assign(orderAtual, order);
        await orderAtual.save();
      }

      return order;
    } catch (err: any) {
      console.error("Error updating order: ", err);
      throw new Error(err);
    }
  }

  async viewOrder(id: string): Promise<OrderDTO | null> {
    try {
      return (await OrderModel.findOne({
        include: [
          {
            model: ItemOrderModel,
            as: "items",
          },
          {
            model: InvoiceModel,
            as: "invoice",
          },
        ],
        where: { id },
      })) as OrderDTO;
    } catch (err: any) {
      console.error("Error viewing order: ", err);
      throw new Error(err);
    }
  }

  async viewNextOrderQueue(): Promise<OrderDTO | null> {
    try {
      return (await OrderModel.findOne({
        where: { status: statusOrder.PREPARING_PENDING },
        order: [["updatedAt", "ASC"]],
      })) as OrderDTO;
    } catch (err: any) {
      console.error("Error viewing next order: ", err);
      throw new Error(err);
    }
  }

  async addItem(
    addItem: AddItemInput
  ): Promise<OrderDTO | null> {
    try {
      await ItemOrderModel.create({
        ...addItem,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const order = await OrderModel.findOne({
        where: { id: addItem.orderId },
      });

      if (!order) throw new Error("Order not found");

      const value = order.value + addItem.totalValue;

      return (await OrderModel.update(
        { value },
        { where: { id: addItem.orderId } }
      ).then(() =>
        OrderModel.findOne({
          where: { id: addItem.orderId },
          include: "items",
        })
      )) as OrderDTO;
    } catch (err: any) {
      console.error("Error adding item: ", err);
      throw new Error(err);
    }
  }

  async removeItem(
    removeItemInput: RemoveItemInput
  ): Promise<OrderDTO | null> {
    try {
      await ItemOrderModel.destroy({
        where: { id: removeItemInput.itemId },
      });

      return (await OrderModel.update(
        { value: 0 },
        { where: { id: removeItemInput.orderId } }
      ).then(() =>
        OrderModel.findOne({
          where: { id: removeItemInput.orderId },
          include: ["items"],
        })
      )) as OrderDTO;
    } catch (err: any) {
      console.error("Error removing item: ", err);
      throw new Error(err);
    }
  }

  async viewItem(id: string): Promise<ItemOrderDTO | null> {
    try {
      return (await ItemOrderModel.findOne({
        where: { id },
      })) as ItemOrderDTO;
    } catch (err: any) {
      console.error("Error viewing item: ", err);
      throw new Error(err);
    }
  }

  async listOrders(
    status?: Array<string>,
    customerId?: string
  ): Promise<Array<OrderDTO> | null> {
    try {
      let where: WhereOptions<OrderDTO> = {
        deletedAt: null,
        status: {
          [Op.or]: [
            statusOrder.PREPARING_COMPLETED,
            statusOrder.PREPARING,
            statusOrder.PREPARING_PENDING,
          ],
        },
      };

      if (status && status.length > 0) {
        where = { ...where, status };
      }

      if (customerId && customerId.length > 0) {
        where = { ...where, customerId };
      }

      return (await OrderModel.findAll({
        where,
        order: [
          sequelize.fn(
            "field",
            sequelize.col("status"),
            statusOrder.PREPARING_COMPLETED,
            statusOrder.PREPARING,
            statusOrder.PREPARING_PENDING
          ),
          ["createdAt", "ASC"],
        ],
        include: ["items", "invoice"],
      })) as OrderDTO[];
    } catch (err: any) {
      console.error("Error listing orders: ", err);
      throw new Error(err);
    }
  }
}

export default OrderDatabaseRepository;
