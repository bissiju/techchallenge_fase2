import { CategoryDTO } from "~domain/entity/types/categoryType";

export default interface CategoryRepository {
  createCategory(Category: CategoryDTO): Promise<CategoryDTO>;
  deleteCategory(idCategory: string): Promise<number>;
  editCategory(
    idCategory: string,
    Category: CategoryDTO
  ): Promise<CategoryDTO | null>;
  listCategories(): Promise<CategoryDTO[]>;
  viewCategory(idCategory: string): Promise<CategoryDTO | null>;
}
