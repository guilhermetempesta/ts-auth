import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const secret = process.env.AUTH_SECRET;

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.sendStatus(401);
    }

    if (secret) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
      return res.json({token});
    } else {
      return res.sendStatus(500);
    }       
  }
}

export default new AuthController();