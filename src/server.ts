import express, { Request, Response } from 'express';

import { sequelize } from './sequelize';

export const server = express();
server.get('/', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  res.send({
    message: 'hello world',
  });
});

server.post('/', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  res.send({
    message: 'hello world',
  });
});
