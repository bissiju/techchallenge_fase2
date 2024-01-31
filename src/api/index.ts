import express, { Express } from "express";

import { Server } from "./server.config";
import {
    categoryRouter,
    paymentRouter,
    orderRouter,
    productRouter,
    customerRouter,
} from "./routers/index";

export default class API {
    private app: Express;

    constructor() {
        this.app = express();
    }

    start() {
        const server = new Server({ appConfig: this.app });

        server.addRouter("/api/category", categoryRouter);
        server.addRouter("/api/product", productRouter);
        server.addRouter("/api/order", orderRouter);
        server.addRouter("/api/customer", customerRouter);
        server.addRouter("/api/payment", paymentRouter);

        server.init();
    }
}


