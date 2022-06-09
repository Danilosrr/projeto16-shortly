import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signUpRouter from './routes/signUpRouter.js';
import signInRouter from './routes/signInRouter.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(signUpRouter);
app.use(signInRouter);

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT)}
);