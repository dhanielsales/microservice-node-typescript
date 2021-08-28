import { Router } from 'express';
import { sub } from 'date-fns';

const health = Router();

health.get('/', async (request, response) => {
  const statusCode = 200; // 500

  const uptime = sub(new Date(), {
    seconds: process.uptime(),
  }).getTime();

  const healthcheck = {
    start: uptime,
    now: new Date().getTime(),
    message: 'available', // unavailable
  };

  return response.status(statusCode).json(healthcheck);
});

export { health };
