import express, { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import { initializeUserEndpoints } from './endpoints/users';
import { initializeSavedDeckEndpoints } from './endpoints/savedDecks';

const prisma = new PrismaClient();

export const server = express();

// Middlewares
server.use(express.json());

// Endpoints
server.get('/', (_: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});

initializeUserEndpoints(server, prisma);
initializeSavedDeckEndpoints(server, prisma);
