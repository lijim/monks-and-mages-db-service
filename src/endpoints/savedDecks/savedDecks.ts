import { Request, Response, Express } from 'express';

import { Prisma, PrismaClient, SavedDeck } from '@prisma/client';

export const initializeSavedDeckEndpoints = (
  server: Express,
  prisma: PrismaClient
) => {
  server.get(
    '/saved_decks/:username',
    async (
      req: Request<{ username: string }, SavedDeck[] | ErrorMessage, EmptyObj>,
      res: Response<SavedDeck[] | ErrorMessage>
    ): Promise<Response<SavedDeck[] | ErrorMessage>> => {
      const { username } = req.params;

      if (!username)
        return res.status(400).send({ message: 'Need a username' });

      const savedDecks = await prisma.savedDeck.findMany({
        where: { user: { username } },
      });
      return res.send(savedDecks);
    }
  );

  server.post(
    '/saved_decks/:username',
    async (
      req: Request<
        { username: string },
        SavedDeck | ErrorMessage,
        { deckName: string; skeleton: Prisma.JsonArray }
      >,
      res: Response<SavedDeck | ErrorMessage>
    ): Promise<Response<SavedDeck | ErrorMessage>> => {
      const { username } = req.params;
      const { deckName, skeleton } = req.body;

      if (!username)
        return res.status(400).send({ message: 'Need a username' });
      if (!deckName)
        return res.status(400).send({ message: 'Need a deck name' });
      if (!skeleton || !Array.isArray(skeleton))
        return res
          .status(400)
          .send({ message: 'Need a deck skeleton in JSON form' });

      const user = await prisma.user.findFirst({ where: { username } });
      if (!user)
        return res.status(400).send({ message: 'No matching user found' });

      const newDeck = await prisma.savedDeck.create({
        data: {
          userUid: user.uid,
          name: deckName,
          skeleton,
        },
      });
      return res.send(newDeck);
    }
  );
};
