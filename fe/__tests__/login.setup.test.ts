import config from '@/config';
import { sleep } from '@/helper/utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post(`${config.API}/auth/login`, async (req, res, ctx) => {
    await sleep(150);
    return res(
      ctx.status(200),
      ctx.json({
        id: '123',
        email: 'asdfadsf@sdfd',
        token: 'xxx'
      })
    );
  })
);

const initServer = () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
};

export default initServer;
