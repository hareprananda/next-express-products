import express from 'express';
import { rateLimit } from 'express-rate-limit';
import http from 'http';
import routes from '@/routes/routes';
import { initRedis } from './db/redis';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
});

initRedis();
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Started at port', PORT);
});
