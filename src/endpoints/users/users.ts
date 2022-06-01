import { Request, Response, Express } from 'express';

import { Prisma, PrismaClient, User } from '@prisma/client';

export const initializeUserEndpoints = (
  server: Express,
  prisma: PrismaClient
) => {
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
      req: Request<EmptyObj, User | ErrorMessage, NewUserRequestBodyParams>,
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

  server.delete(
    '/users/:uid',
    async (
      req: Request<{ uid: string }, User | ErrorMessage, EmptyObj>,
      res: Response<User | ErrorMessage>
    ): Promise<Response<User | ErrorMessage>> => {
      const { uid } = req.params;

      if (!uid) return res.status(400).send({ message: 'Need a uid' });
      // TODO: add unit tests
      // TODO: add auth0 layer
      try {
        const deleteUser = prisma.user.delete({
          where: {
            uid,
          },
        });
        const deleteDecks = prisma.savedDeck.deleteMany({
          where: {
            userUid: uid,
          },
        });
        await prisma.$transaction([deleteUser, deleteDecks]);

        return res.send({ message: 'Success' });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          return res
            .status(400)
            .send({ message: 'A user with this uid already exists' });
        }

        return res.status(400).send({
          message: `Something went wrong in deleting a user: ${JSON.stringify(
            error
          )}`,
        });
      }
    }
  );
};
