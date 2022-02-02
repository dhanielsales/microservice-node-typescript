import { exceptionsHandler } from '@shared/presentation/middlewares/conventional/exceptionsHandler';
import {
  Router as ExpressRouter,
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

export type Response = ExpressResponse;
export type Request = ExpressRequest;
export type NextFunction = ExpressNextFunction;
export type Middleware = (
  err: Error,
  request: Request,
  response: Response,
  next: ExpressNextFunction,
) => Response;

type Handler = (request: Request, response: Response) => Promise<any>;
type Method = (path: string, handler: Handler) => void;

export interface IRouter {
  use(path: string, router: IRouter): void;
  use(middleware: Middleware): void;

  get: Method;
  post: Method;
  put: Method;
  patch: Method;
  delete: Method;
  options: Method;
  head: Method;
}

export class ApiImpl {
  public readonly router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }
}

// export abstract class ApiImpl {
//   public readonly router: Router = Router();

//   constructor() {
//     this.router = Router();
//   }

//   getRouter(): Router {
//     return this.router;
//   }

//   applyGroup(path: string, route: Router) {
//     this.router.use(path, route);
//   }

//   applyRoute(
//     requestMethod: RequestMethod,
//     path: string,
//     handler: (request: Request, response: Response) => Promise<any>,
//   ) {
//     if (requestMethod === RequestMethod.GET) {
//       return this.router.get(path, handler);
//     }
//     if (requestMethod === RequestMethod.POST) {
//       return this.router.post(path, handler);
//     }
//     if (requestMethod === RequestMethod.PUT) {
//       return this.router.put(path, handler);
//     }
//     if (requestMethod === RequestMethod.PATCH) {
//       return this.router.patch(path, handler);
//     }
//     if (requestMethod === RequestMethod.DELETE) {
//       return this.router.delete(path, handler);
//     }
//     if (requestMethod === RequestMethod.OPTIONS) {
//       return this.router.options(path, handler);
//     }
//     if (requestMethod === RequestMethod.HEAD) {
//       return this.router.head(path, handler);
//     }
//   }

//   applyMiddleware(middle: Middleware) {
//     this.router.use(middle);
//   }
// }
