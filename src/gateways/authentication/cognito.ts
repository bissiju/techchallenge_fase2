import { CognitoJwtVerifier } from "aws-jwt-verify";
import dotenv from "dotenv";
import throwError from "handlerError/handlerError";
import jwt from 'jsonwebtoken';

import AuthenticationRepository, { UserType } from "~domain/repository/authenticationRepository";

dotenv.config();

const CUSTOMER_POOL_ID = process.env.CUSTOMER_POOL_ID as string;
const ADMIN_POOL_ID = process.env.ADMIN_POOL_ID as string;
const POOL_CUSTOMER_CLIENT_ID = process.env.POOL_CUSTOMER_CLIENT_ID as string;
const POOL_ADMIN_CLIENT_ID = process.env.POOL_ADMIN_CLIENT_ID as string;


interface DecodedToken {
  "sub": string,
  "event_id": string,
  "token_use": string,
  "scope": string,
  "auth_time": number,
  "iss": string,
  "exp": number,
  "iat": number,
  "jti": string,
  "client_id": string,
  "username": string
}

export default class Authenticatior implements AuthenticationRepository {
  async validateToken(userPoolId: string, clientId: string, token: string): Promise<string> {
    const verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: "access",
      clientId,
    });

    const payload = await verifier.verify(token);
    return payload.sub;
  }

    async authUser(token: string, tipo: UserType): Promise<string> {
    const decodedToken = jwt.decode(token) as DecodedToken;

    const PoolRegex = /([^/]+)$/;
    const getPoolIdMatch = decodedToken?.iss?.match(PoolRegex);

    if (!getPoolIdMatch) {
      return throwError('NO_PERMISSION', 'No permission');
    }
    const getPoolId = getPoolIdMatch[1];

    return `https://app-domain/callback?token=${token}`;
  }
}