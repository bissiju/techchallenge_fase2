export default interface CustomerInput {
    id?: string;
    cpf: string | null;
    email: string | null;
    name?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

export interface CustomerDTO {
    id?: string;
    cpf: string | null;
    email: string | null;
    name?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }
