import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

//app.use(Routers);

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT)}
);