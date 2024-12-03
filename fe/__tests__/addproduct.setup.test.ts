import config from '@/config';
import { sleep } from '@/helper/utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TestHelper from './utils/helper';

const server = setupServer(
  rest.post(`${config.API}/products`, async (req, res, ctx) => {
    await sleep(100);
    // const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json(
        TestHelper.successRes({
          id: '640451733238226290',
          name: 'AAA',
          price: {
            amount: 10000,
            formattedAmount: '$10,000'
          },
          type: 'second',
          stock: 45,
          year: '2020'
        })
      )
    );
  })
);

const initServer = () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
};

export default initServer;
