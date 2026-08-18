import express from 'express';
import config from './config/index.js';
import { requestLogger } from './middleware/logging.js';

const app = express();

app.use(express.raw({ type: '*/*', limit: '50mb' }));
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.listen(config.port, () => {
  console.log(`git-http listening on :${config.port}`);
});
