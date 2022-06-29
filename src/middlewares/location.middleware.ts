import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as ipLocation from 'ip-to-location';
import { IGeo } from 'src/interfaces';
import { ISession } from 'src/typings';
@Injectable()
export class LocationMiddleware implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    ip.toString()

    console.log(ip)
    const session: ISession = req.session;
    const location: IGeo = await ipLocation.fetch(ip).catch((err) => {
      throw err;
    });
    console.log(location)
    req.location = location
    if (!session.location) {
      session.location = { ...location, ip };
    }

    next();
  }
}
