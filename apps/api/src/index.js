import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/index.js';
import { loadSession } from './middleware/auth.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logging.js';
import routes from './routes/index.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(loadSession);

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`api listening on :${config.port}`);
});
