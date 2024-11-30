import { Response, Request } from 'express';

const auth = (f: (req: Request, res: Response) => void) => {
  return (r: Request, res: Response) => {
    // if (1 === 1) {
    //   res.status(401).json({ message: 'Unauthorized' });
    //   return;
    // }
    f(r, res);
  };
};

export default auth;
