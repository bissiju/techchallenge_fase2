import { Sequelize } from "sequelize";

export interface DatabaseInterface {
  database: string;
  host: string;
  username: string;
  password: string;
  port: number;

  getInstance: () => Sequelize;
  authenticate: () => Promise<void>;
}

export type DatabaseConstructorInterface = Pick<
  DatabaseInterface,
  "database" | "host" | "username" | "password" | "port"
>;
