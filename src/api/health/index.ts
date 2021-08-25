import { Router } from 'express';

const health = Router();

health.get('/', async (request, response) => {
  const statusCode = 200; // 500

  const healthcheck = {
    uptime: process.uptime(),
    message: 'available', // unavailable
    timestamp: Date.now(),
  };

  return response.status(statusCode).json(healthcheck);
});

export { health };
