import express, { Request, Response } from 'express';

export const server = express();
server.get('/', (_: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});
