import { DataTypes, Model, Sequelize } from "sequelize";

import { PaymentDTO } from "~domain/entity/types/paymentType";

import InvoiceModel from "./invoiceModel";

class PaymentModel
  extends Model<PaymentDTO>
  implements PaymentDTO
{
  public id!: string;
  public isPaid!: boolean;
  public paymentValue!: number;
  public payment_method!: string;
  public invoiceId!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    PaymentModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        isPaid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        paymentValue: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        payment_method: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        invoiceId: {
          type: DataTypes.UUID,
          allowNull: false,
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
        tableName: "payments",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasOne(InvoiceModel, {
      foreignKey: 'invoiceId'
    })

  }
}

export default PaymentModel;
