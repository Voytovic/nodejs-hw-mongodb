import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import createHttpError from 'http-errors';

const PORT = env('PORT', 3000);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api', contactsRouter);

  app.use((req, res, next) => {
    next(createHttpError(404, 'Route not found'));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: 'error',
      message: err.message || 'Something went wrong',
      data: err.data || null,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
