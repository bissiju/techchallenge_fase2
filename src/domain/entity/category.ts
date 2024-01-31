import { CategoryInput } from "./types/categoryType";

export default class Category {
  public id: string;
  public name: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(categoryInput: CategoryInput) {
    this.id = categoryInput.id;
    this.name = categoryInput.name;
    this.createdAt = categoryInput.createdAt ?? new Date();
    this.deletedAt = categoryInput.deletedAt ?? null;
    this.updatedAt = categoryInput.updatedAt ?? null;
  }

}