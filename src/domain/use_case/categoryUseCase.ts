import Category from "~domain/entity/category";
import { CategoryDTO, CategoryInput } from "~domain/entity/types/categoryType";
import CategoryRepository from "~domain/repository/categoryRepository";

export default class CategoryUseCase {
  static async createCategory(categoryRepository: CategoryRepository, categoryInput: CategoryInput): Promise<CategoryDTO> {
    const category = new Category(categoryInput);
    return await categoryRepository.createCategory(category);
  }

  static async deleteCategory(categoryRepository: CategoryRepository, id: string): Promise<number> {
    return await categoryRepository.deleteCategory(id);
  }

  static async editCategory(categoryRepository: CategoryRepository, id: string, categoryInput: CategoryInput): Promise<CategoryDTO | null> {
    const category = new Category(categoryInput);
    return await categoryRepository.editCategory(id, category);
  }

  static async listCategories(categoryRepository: CategoryRepository): Promise<CategoryDTO[]> {
    return await categoryRepository.listCategories();
  }

  static async viewCategory(categoryRepository: CategoryRepository, id: string): Promise<CategoryDTO | null> {
    return await categoryRepository.viewCategory(id);
  }
}
