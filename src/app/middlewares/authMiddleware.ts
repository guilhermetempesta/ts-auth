import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const secret = process.env.AUTH_SECRET;

export default function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    if (secret) {
      const data = jwt.verify(token, secret);
      const { id } = data as TokenPayload;
      req.userId = id;
      return next();
    } else {
      return res.sendStatus(401);      
    }
  } catch {
    return res.sendStatus(401);
  }

}