import { NextFunction, Request, Response } from "express";

import Authenticatior from "./gateways/authentication/cognito";
import { UserType } from "./domain/repository/authenticationRepository";


export default function authenticate(type: UserType) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req?.headers?.authorization?.split(' ')[1] as string;
            const authenticatior = new Authenticatior();
            const customerId = await authenticatior.authUser(token, type);

            req.UserType = type;
            req.customerId = customerId;
            return next();
        } catch (error: any) {
            if (error.code === 'NO_PERMISSION') {
                return res.status(401).json({
                    error: error.message,
                });
            }
            console
            return res.status(401).json({
                error: error.message,
            });
        }
    };
}
