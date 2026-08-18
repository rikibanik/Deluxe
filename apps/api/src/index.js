import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/index.js';
import { requestLogger } from './middleware/logging.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.listen(config.port, () => {
  console.log(`api listening on :${config.port}`);
});
