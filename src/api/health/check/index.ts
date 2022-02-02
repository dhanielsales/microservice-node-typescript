import { Router, Request, Response } from 'express';
import { sub } from 'date-fns';

export class Check {
  public readonly router: Router = Router();

  constructor() {
    this.router.get('/', this.index);
  }

  async index(_: Request, response: Response): Promise<any> {
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
  }
}
