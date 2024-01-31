import { DataTypes, Model, Sequelize } from "sequelize";

import { CategoryDTO } from "~domain/entity/types/categoryType";

import ProductModel from "./productModel";

class CategoryModel extends Model<CategoryDTO> implements CategoryDTO {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    CategoryModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
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
        tableName: "categories",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasMany(ProductModel, {
      as: "categories",
      foreignKey: "categoryId",
    });
  }
}

export default CategoryModel;
