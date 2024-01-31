import { DataTypes, Model, Sequelize } from "sequelize";

import { ItemOrderDTO } from "~domain/entity/types/itemOrderType";

import OrderModel from "./orderModel";
import ProductModel from "./productModel";

class ItemOrderModel extends Model<ItemOrderDTO> implements ItemOrderDTO {
  public id!: string;
  public productId!: string;
  public orderId!: string;
  public quantity!: number;
  public itemValue!: number;
  public totalValue!: number;
  public note!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    ItemOrderModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        itemValue: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        totalValue: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        note: {
          type: DataTypes.STRING,
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
        tableName: "items_order",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(OrderModel, {
      as: "order",
    });

    this.belongsTo(ProductModel, {
      as: "product",
    });
  }
}

export default ItemOrderModel;
