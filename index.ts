import express from 'express';
import { Request, Response } from 'express';

const app = express();
const { PORT = 5001 } = process.env;
app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});
app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});
