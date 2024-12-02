import config from '@/config';
import { sleep } from '@/helper/utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TestHelper from './utils/helper';

const server = setupServer(
  rest.get(`${config.API}/products/chart/:type`, async (req, res, ctx) => {
    await sleep(100);
    return res(
      ctx.status(200),
      ctx.json(
        TestHelper.successRes([
          {
            comparator: 'second',
            value: 150
          },
          {
            comparator: 'new',
            value: 30
          }
        ])
      )
    );
  }),
  rest.get(`${config.API}/products`, async (req, res, ctx) => {
    await sleep(100);
    return res(
      ctx.status(200),
      ctx.json(
        TestHelper.successRes({
          metadata: {
            count: 6,
            limit: 20,
            page: 1
          },
          data: [
            {
              id: '795971733154588900',
              name: 'Toyota',
              price: {
                amount: 10000,
                formattedAmount: '$10,000'
              },
              type: 'second',
              stock: 45,
              year: '2020'
            }
          ]
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
