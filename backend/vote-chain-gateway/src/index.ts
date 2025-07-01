import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import candidateRouter from './routes/candidate';
import healthRouter from './routes/health';
import partyRouter from './routes/party';
import votingRouter from './routes/voting';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;

app.use('/api', healthRouter);
app.use('/api/candidates', candidateRouter);
app.use('/api/parties', partyRouter);
app.use('/api/voting', votingRouter);

app.listen(port, () => {
  console.log(`Server ${environment} running on port ${port}`);
});
