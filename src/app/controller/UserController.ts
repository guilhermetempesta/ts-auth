import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const users = await repository.find({ select: ['id','email']});      
      return res.json(users);
    } catch(err) {
      return res.sendStatus(500);
    }    
  }

  async store(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { email, password } = req.body;

      const userExists = await repository.findOne({ where: { email } });

      if (userExists) {
        return res.sendStatus(409);
      }

      const user = repository.create({ email, password });
      await repository.save(user);

      return res.json(user);
    } catch(err) {
      return res.sendStatus(500);
    }
  }
}

export default new UserController();