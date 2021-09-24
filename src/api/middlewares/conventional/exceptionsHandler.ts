import AppError from '@shared/infra/agregators/AppError';
import AppLogger from '@shared/infra/agregators/AppLogger';
import { Middleware } from '@model/api';

export const exceptionsHandler: Middleware = (err, request, response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details && err.details,
    });
  }

  new AppLogger({
    message: `Error on route ${request.method} ${request.path} `,
    type: 'ERROR',
    error: err,
  });

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
