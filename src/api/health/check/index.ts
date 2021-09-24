import { sub } from 'date-fns';
import { ApiImpl, RequestMethod, Response, Request } from '@model/api';

export class Check extends ApiImpl {
  constructor() {
    super();

    this.applyRoute(RequestMethod.GET, '/', this.check);
  }

  async check(_: Request, response: Response) {
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
