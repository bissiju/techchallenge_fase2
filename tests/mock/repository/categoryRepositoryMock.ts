import CategoryRepository from "../../../src/domain/repository/categoryRepository"

export default class CategoryRepositoryMock {
    createdAt: Date
    
    constructor(createdAt: Date) {
        this.createdAt = createdAt
    }

    repository() {
        const categoryRepositoryMock: CategoryRepository = {
            createCategory: jest.fn().mockResolvedValue({
              id: "1",
              name: "category_mock_1",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }),
            deleteCategory: jest.fn().mockResolvedValue(1),
            editCategory: jest.fn().mockResolvedValue({
              id: "1",
              name: "category_mock_att",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }),
            listCategories: jest.fn().mockResolvedValue([{
              id: "1",
              name: "category_mock_1",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }, {
              id: "2",
              name: "category_mock_2",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }, {
              id: "3",
              name: "category_mock_3",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }]),
            viewCategory: jest.fn().mockResolvedValue({
              id: "1",
              name: "category_mock_1",
              createdAt: this.createdAt,
              updatedAt: null,
              deletedAt: null,
            }),
          }

          return categoryRepositoryMock;
    }
}