import { DataTypes, Model, Sequelize } from "sequelize";

import { Invoice } from "~domain/entity/invoice";
import { ItemOrderDTO } from "~domain/entity/types/itemOrderType";
import { OrderDTO, StatusOrder, statusOrder } from "~domain/entity/types/orderType";

import InvoiceModel from "./invoiceModel";
import ItemOrderModel from "./itemOrderModel";
import CustomerModel from "./customerModel";

class OrderModel extends Model<OrderDTO> implements OrderDTO {
  public id!: string;
  public customerId!: string;
  public invoiceId!: string;
  public invoice?: Invoice;
  public status!: StatusOrder;
  public value!: number;
  public items?: ItemOrderDTO[];
  public deliveredAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    OrderModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        customerId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        invoiceId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM,
          allowNull: false,
          defaultValue: statusOrder.STARTED,
          values: [
            statusOrder.STARTED,
            statusOrder.PAYMENT_PENDING,
            statusOrder.PREPARING_PENDING,
            statusOrder.PREPARING,
            statusOrder.PREPARING_COMPLETED,
            statusOrder.DELIVERED,
            statusOrder.FAILED
          ],
        },
        value: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        deliveredAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        paranoid: true,
        sequelize,
        tableName: "orders",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(InvoiceModel, {
      as: "invoice",
    });

    this.hasMany(ItemOrderModel, {
      foreignKey: "orderId",
      sourceKey: "id",
      as: "items",
    });

    this.belongsTo(CustomerModel, {
      as: "customer",
    });
  }
}

export default OrderModel;
