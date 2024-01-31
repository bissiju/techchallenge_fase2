import { DataTypes, Model, Sequelize } from "sequelize";

import {
  Invoice,
  paymentStatus,
  PaymentStatus,
} from "~domain/entity/invoice";
import { OrderDTO } from "~domain/entity/types/orderType";
import OrderModel from "./orderModel";

class InvoiceModel extends Model<Invoice> implements Invoice {
  public id!: string;
  public orderId!: string;
  public order?: OrderDTO;
  public paymentStatus!: PaymentStatus;
  public paidAt!: Date | null;
  public qrCode!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    InvoiceModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        paymentStatus: {
          type: DataTypes.ENUM,
          allowNull: true,
          values: [
            paymentStatus.PAYMENT_PENDING,
            paymentStatus.PAYMENT_ERROR,
            paymentStatus.PAYMENT_APPROVED,
            paymentStatus.PAYMENT_DENIED,
          ],
        },
        paidAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        qrCode: {
          type: DataTypes.STRING(10000),
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
        tableName: "invoices",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(OrderModel, {
      as: "order",
    });
  }
}

export default InvoiceModel;
