import dotenv from "dotenv";

import { DatabaseConnection } from "gateways/database/db.connection";
import Modelos from "gateways/database/models";
import API from "api";

dotenv.config();

const database = new DatabaseConnection({
  database: process.env.DB_DATABASE ?? "database",
  host: process.env.DB_HOST ?? "localhost",
  username: process.env.DB_USERNAME ?? "user",
  password: process.env.DB_PASSWORD ?? "pass",
  port: Number(process.env.DB_PORT) ?? 3306,
});

async function init() {

  await database.authenticate();
  await database.synchronizeModels(Modelos);
  const api = new API();
  api.start()

}

init();
