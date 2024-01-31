import { DataTypes, Model, Sequelize } from 'sequelize';

import { CustomerDTO } from '~domain/entity/types/customerType';

import OrderModel from './orderModel';

class CustomerModel extends Model<CustomerDTO> implements CustomerDTO {
  public id!: string;
  public cpf!: string | null;
  public name!: string | null;
  public email!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    CustomerModel.init({

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    }, {
      paranoid: true,
      sequelize,
      tableName: 'customers',
      timestamps: true,
      underscored: true,
    });
  }

  static associate(): void {
    this.hasMany(OrderModel, {
      foreignKey: "customer_id",
      sourceKey: "id",
      as: "order",
    });
  }

}

export default CustomerModel;