import express from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@microservicescommon/common';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);
app.use(currentUser);

import { createChargeRouter } from './routes/new';
app.use(createChargeRouter);

app.all('*path', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
