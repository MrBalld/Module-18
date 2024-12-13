import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { graphql, GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = ({ req }: { req: Request }) => {
  let token = req.headers.authorization || req.body.token || req.query.token;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }
  const secretKey = process.env.JWT_SECRET_KEY || '';
  try{
  const {data}: any = jwt.verify(token, secretKey, {maxAge: "2hr"});
  req.user = data as JwtPayload;
  } catch(err){
    console.log("invalid token");
  }
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '2h' });
};
export class AuthenticationError extends GraphQLError {
  constructor(message: string){
    super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
    Object.defineProperty(this, "name", {value: AuthenticationError});
  }
};