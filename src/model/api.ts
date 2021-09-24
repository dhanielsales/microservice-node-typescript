import { Router, Response as ExpressResponse, Request as ExpressRequest, NextFunction as ExpressNextFunction } from "express";

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
export type NextFunction = ExpressNextFunction
export type Middleware = (err: Error, request: Request, response: Response, next: ExpressNextFunction) => Response

type Handler = (request: ExpressRequest, response: ExpressResponse) => Promise<any> 

export abstract class ApiImpl {
  private readonly router: Router = Router();

  getRouter(): Router {
    return this.router
  }

  applyGroup(path: string, route: Router) {
    this.router.use(path, route)
  }

  applyRoute(requestMethod: RequestMethod, path: string, handler: Handler) {
    if (requestMethod === RequestMethod.GET) {
      return this.router.get(path, handler)
    }
    if (requestMethod === RequestMethod.POST) {
      return this.router.post(path, handler)
    }
    if (requestMethod === RequestMethod.PUT) {
      return this.router.put(path, handler)
    }
    if (requestMethod === RequestMethod.PATCH) {
      return this.router.patch(path, handler)
    }
    if (requestMethod === RequestMethod.DELETE) {
      return this.router.delete(path, handler)
    }
    if (requestMethod === RequestMethod.OPTIONS) {
      return this.router.options(path, handler)
    }
    if (requestMethod === RequestMethod.HEAD) {
      return this.router.head(path, handler)
    }
  }

  applyMiddleware(route: Middleware) {
    this.router.use(route)
  }
}
