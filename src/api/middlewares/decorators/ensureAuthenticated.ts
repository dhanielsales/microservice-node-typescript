import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@shared/config/auth.config';
import AppError from '@shared/infra/agregators/AppError';

import { Decorator } from '@model/utils';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// TODO: Incluir validação com ACL Roles e Permissions? Outro Decorator?
export function EnsureAuthenticated(): Decorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (request: Request, response: Response, _: NextFunction) => {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new AppError('JWT token missing.');
      }

      const [, token] = authHeader.split(' ');

      try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as TokenPayload;

        request.user = {
          id: sub,
        };

        await originalMethod(request, response);
        return descriptor;
      } catch {
        throw new AppError('Invalid JWT token.', 401);
      }
    };
  };
}
