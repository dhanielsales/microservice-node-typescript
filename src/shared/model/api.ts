import {
  Response as ExpressResponse,
  Request as ExpressRequest,
  NextFunction as ExpressNextFunction,
} from 'express';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}
export interface Response extends ExpressResponse {}
export interface Request extends ExpressRequest {}
export interface NextFunction extends ExpressNextFunction {}

export type Middleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => Response;
