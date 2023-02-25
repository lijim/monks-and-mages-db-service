import { Request, Response, Express } from 'express';

import { Prisma, PrismaClient, User } from '@prisma/client';
import { checkJwt } from '../../authz/checkJWT';
import { getUserFromJWT } from '../../authz';

interface NewUserRequestBodyParams {
  uid: string;
  username: string;
}

export const initializeUserEndpoints = (
  server: Express,
  prisma: PrismaClient
) => {
  server.get(
    '/users',
    checkJwt,
    async (
      _: Request<EmptyObj, User[], EmptyObj>,
      res: Response<User[]>
    ): Promise<Response<User[]>> => {
      const users = await prisma.user.findMany();
      return res.send(users);
    }
  );

  server.get(
    '/users/self',
    checkJwt,
    async (
      req: Request<EmptyObj, User, EmptyObj>,
      res: Response<User | ErrorMessage>
    ) => {
      const user = await getUserFromJWT(req.auth?.token);

      if (!user) {
        return res.status(400).send({ message: 'Need a username' });
      }

      const foundUser = await prisma.user.findUnique({
        where: {
          username: user.username,
        },
      });

      if (!foundUser) {
        return res.status(204).send({ message: 'No user found' });
      }

      return res.send(foundUser);
    }
  );

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

      const apiKey = req.header('x-api-key');
      if (apiKey !== process.env.API_KEY) {
        return res
          .status(401)
          .send({ message: 'Not authorized!  Missing the right API key' });
      }

      try {
        const user = await prisma.user.create({ data: { username, uid } });
        return res.send(user);
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          return res.status(400).send({
            message:
              'A user with this uid already exists OR this username is already taken',
          });
        }

        return res
          .status(400)
          .send({ message: 'Something went wrong in creating a user' });
      }
    }
  );

  server.delete(
    '/users',
    async (
      req: Request<EmptyObj, SuccessMessage | ErrorMessage, { uid: string }>,
      res: Response<SuccessMessage | ErrorMessage>
    ): Promise<Response<SuccessMessage | ErrorMessage>> => {
      const { uid } = req.body;

      if (!uid) return res.status(400).send({ message: 'Need a uid' });

      const apiKey = req.header('x-api-key');
      if (apiKey !== process.env.API_KEY) {
        return res
          .status(401)
          .send({ message: 'Not authorized!  Missing the right API key' });
      }

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
        return res.status(400).send({
          message: `Something went wrong in deleting a user: ${JSON.stringify(
            error
          )}`,
        });
      }
    }
  );
};
