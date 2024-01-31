import { CategoryDTO, CategoryInput } from "~domain/entity/types/categoryType";
import CategoryRepository from "~domain/repository/categoryRepository";
import CategoryUseCase from "~domain/use_case/categoryUseCase";

export class CategoryController {
  static async createCategory(
    categoryRepository: CategoryRepository,
    category: CategoryInput
  ): Promise<CategoryDTO | null> {
    const categoryCreated = await CategoryUseCase.createCategory(
      categoryRepository, category
    );
    return categoryCreated;
  }

  static async deleteCategory(
    categoryRepository: CategoryRepository,
    id: string
  ): Promise<number> {
    return await CategoryUseCase.deleteCategory(
      categoryRepository, id
    );
  }

  static async editCategory(
    categoryRepository: CategoryRepository,
    id: string,
    category: CategoryInput
  ): Promise<CategoryDTO | null> {
    return await CategoryUseCase.editCategory(
      categoryRepository, id, category
    );
  }

  static async listCategories(
    categoryRepository: CategoryRepository
  ): Promise<CategoryDTO[]> {
    return await CategoryUseCase.listCategories(categoryRepository);
  }

  static async viewCategory(
    categoryRepository: CategoryRepository,
    id: string
  ): Promise<CategoryDTO | null> {
    return await CategoryUseCase.viewCategory(categoryRepository, id);
  }
}