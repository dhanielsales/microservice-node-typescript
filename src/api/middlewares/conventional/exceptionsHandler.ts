import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import AppLogger from '@shared/infra/agregators/AppLogger';

export function exceptionsHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details && err.details,
    });
  }

  new AppLogger({
    date: new Date(),
    message: `Error on route ${request.method} ${request.path} `,
    type: 'ERROR',
    error: err,
  });

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
