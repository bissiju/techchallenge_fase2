import { CategoryDTO } from "~domain/entity/types/categoryType";
import CategoryRepository from "~domain/repository/categoryRepository";

import CategoryModel from "../models/categoryModel";


class CategoriesDatabaseRepository implements CategoryRepository {
  async createCategory(category: CategoryDTO): Promise<CategoryDTO> {
    try {
      return await CategoryModel.create(category) as CategoryDTO;
    } catch (err: any) {
      console.error("Error creating Category: ", err);
      throw new Error(err);
    }
  }

  async deleteCategory(idCategory: string): Promise<number> {
    try {
      return CategoryModel.destroy({ where: { id: idCategory } });
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async editCategory(
    idCategory: string,
    category: CategoryDTO
  ): Promise<CategoryDTO | null> {
    try {
      const categoryAtual = await CategoryModel.findByPk(idCategory);

      if (categoryAtual) {
        Object.assign(categoryAtual, category);
        await categoryAtual.save();
      }
      return categoryAtual as CategoryDTO;
    } catch (err: any) {
      console.error("Error editing Category: ", err);
      throw new Error(err);
    }
  }

  async listCategories(): Promise<CategoryDTO[]> {
    try {
      return await CategoryModel.findAll();
    } catch (err: any) {
      console.error("Error listing categories: ", err);
      throw new Error(err);
    }
  }

  async viewCategory(idCategory: string): Promise<CategoryDTO | null> {
    try {
      return await CategoryModel.findByPk(idCategory);
    } catch (err: any) {
      console.error("Error viewing Category: ", err);
      throw new Error(err);
    }
  }
}

export default CategoriesDatabaseRepository;
