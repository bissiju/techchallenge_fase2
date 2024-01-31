import { Sequelize } from "sequelize";

import createCategories from "./seeders/create_categories";

import {
  DatabaseConstructorInterface,
  DatabaseInterface,
} from "./interface/db.interface";

interface Model {
  initialize(sequelize: Sequelize): void;
  associate(): void;
}

export class DatabaseConnection implements DatabaseInterface {
  database: string;
  host: string;
  username: string;
  password: string;
  port: number;
  private instance: Sequelize;

  constructor({
    database,
    host,
    username,
    password,
    port,
  }: DatabaseConstructorInterface) {
    this.database = database;
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;

    this.instance = new Sequelize({
      database: this.database,
      dialect: "mysql",
      host: this.host,
      username: this.username,
      password: this.password,
      port: this.port,
    });
  }

  getInstance(): Sequelize {
    return this.instance;
  }

  async authenticate(): Promise<void> {
    try {
      await this.getInstance().authenticate();
      console.log(`Authenticated`);
    } catch (err: any) {
      console.log(`Authentication failed: ${err}`);
      console.log(`Waiting 10 seconds to retry`)
      await new Promise((resolve) => setTimeout(resolve, 10000));
      console.log("Retrying");
      return await this.authenticate();
    }
  }

  async synchronizeModels(models: Model[]) {
    try {
      models.forEach((model) => {
        model.initialize(this.instance);
      });

      models.forEach((model) => {
        if (model.associate) {
          model.associate();
        }
      });
      await this.instance.sync();
      console.log("Models synchronized");

      await createCategories.up(
        this.instance.getQueryInterface(),
        this.instance
      );
    } catch (error) {
      console.error("Models synchronization failed: ", error);
    }
  }
}
