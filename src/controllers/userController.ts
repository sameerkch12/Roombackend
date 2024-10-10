import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = await UserService.createUser(req.body);
  res.status(201).json(newUser);
};
