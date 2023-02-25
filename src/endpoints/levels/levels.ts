import { Request, Response, Express } from 'express';
import { LEVELS, Level } from '../../consts/xpSystem';

export const initializeLevelEndpoints = (server: Express) => {
  server.get(
    '/levels',
    async (
      _: Request<EmptyObj, Level[], EmptyObj>,
      res: Response<Level[]>
    ): Promise<Response<Level[]>> => {
      return res.send(LEVELS);
    }
  );
};
