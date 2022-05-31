import express, { Request, Response } from 'express';

import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const server = express();

type ErrorMessage = {
  message: string;
};

type EmptyObj = Record<string, never>;

// Middlewares
server.use(express.json());

// Endpoints
server.get('/', (_: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});

// User endpoints
server.get(
  '/users',
  async (
    _: Request<EmptyObj, User[], EmptyObj>,
    res: Response<User[]>
  ): Promise<Response<User[]>> => {
    const users = await prisma.user.findMany();
    return res.send(users);
  }
);

interface NewUserRequestBodyParams {
  uid: string;
  username: string;
}

server.post(
  '/users/new_user',
  async (
    req: Request<EmptyObj, User, NewUserRequestBodyParams>,
    res: Response<User | ErrorMessage>
  ): Promise<Response<User | ErrorMessage>> => {
    const { username, uid } = req.body;
    if (!username || !uid)
      return res
        .status(400)
        .send({ message: 'Need both a username and a uid' });
    // TODO: add unit tests
    // TODO: add auth0 layer
    try {
      const user = await prisma.user.create({ data: { username, uid } });
      return res.send(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return res
          .status(400)
          .send({ message: 'A user with this uid already exists' });
      }

      return res
        .status(400)
        .send({ message: 'Something went wrong in creating a user' });
    }
  }
);
