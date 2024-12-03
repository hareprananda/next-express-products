import config from '@/config';
import { sleep } from '@/helper/utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TestHelper from './utils/helper';

const server = setupServer(
  rest.get(`${config.API}/products`, async (req, res, ctx) => {
    await sleep(100);
    // const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json(
        TestHelper.successRes({
          metadata: {
            count: 50,
            limit: 3,
            page: 1
          },
          data: [
            {
              id: '627091733154573970',
              name: 'Toyota',
              price: {
                amount: 10000,
                formattedAmount: '$10,000'
              },
              type: 'new',
              stock: 20,
              year: '2000'
            },
            {
              id: '11401733154561831',
              name: 'Lambo',
              price: {
                amount: 10000,
                formattedAmount: '$10,000'
              },
              type: 'new',
              stock: 10,
              year: '2010'
            },
            {
              id: '318691733240473098',
              name: 'Camry',
              price: {
                amount: 1000,
                formattedAmount: '$1,000'
              },
              type: 'new',
              stock: 10,
              year: 1990
            }
          ]
        })
      )
    );
  })
);

const initServer = () => {
  beforeAll(() => server.listen());

  afterAll(() => server.close());
};

export default initServer;
