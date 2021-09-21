import { Request, Response } from 'express';
import AppError from '@shared/infra/agregators/AppError';

import { Decorator } from '@model/utils';

export function Model(): Decorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (request: Request, response: Response) => {
      try {
        // Do your middleware HERE
        await originalMethod(request, response);
        return descriptor;
      } catch {
        throw new AppError('Your Error on Middleware', 500);
      }
    };
  };
}
