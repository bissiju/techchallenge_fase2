import { json, urlencoded } from "body-parser";
import { Express, Request, Response, Router } from "express";
import morgan from "morgan";

import {
  ServerConstructorInterface,
  ServerInterface,
} from "./interface/server.interface";

export class Server implements ServerInterface {
  appConfig: Express;

  routers: Array<{ [routeBase: string]: Router }>;

  port = Number(process.env.PORT) || 3000;

  constructor({ appConfig }: ServerConstructorInterface) {
    this.appConfig = appConfig;
    this.routers = [];
  }

  addRouter(routeBase: string, router: Router): void {
    this.routers.push({ [routeBase]: router });
  }

  async init(): Promise<void> {
    try {
      if (process.env.NODE_ENV === "development")
        this.appConfig.use(morgan("dev"));

      this.appConfig.use(json());
      this.appConfig.use(urlencoded({ extended: true }));

      this.appConfig.get("/api/health", (req: Request, res: Response) => {
        res.status(200).json({
          status: "success",
          message: "Ok!",
        });
      });

      for (const route of this.routers) {
        const routeBase = Object.keys(route)[0];
        this.appConfig.use(routeBase, route[routeBase]);
      }

      this.appConfig.all("*", (req: Request, res: Response) => {
        res.status(404).json({
          status: "fail",
          message: `Route ${req.originalUrl} not found`,
        });
      });

      this.appConfig.listen(this.port, async () => {
        console.log(`Running at http://localhost:${this.port}`);
      });
    } catch (err: unknown) {
      console.error("Error initing server:", err);
    }
  }
}
