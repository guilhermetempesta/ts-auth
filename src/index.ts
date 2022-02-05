import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import './database/connect';
import routes from './routes';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

