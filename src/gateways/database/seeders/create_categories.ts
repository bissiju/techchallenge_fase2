import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    const countCategoriesRow: any = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM categories"
    );

    if (countCategoriesRow[0][0].count === 0) {
      await queryInterface.bulkInsert("categories", [
        {
          id: uuidv4(),
          name: "Lanche",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: "Acompanhamento",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: "Bebida",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: "Sobremesa",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
  },
};
