import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/infra/agregators/AppError';

export function Model(err: Error, request: Request, response: Response, next: NextFunction) {
  // Validate your middleware HERE
  // If your middleware failures, throws a AppError else make a call for next function.

  // if (true) {
  //  next();
  // } else {
  //  throw new AppError('Your Error on Middleware', 500);
  // }
  next();
}
