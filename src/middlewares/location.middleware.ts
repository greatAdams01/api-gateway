import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as ipLocation from 'ip-to-location';
import { IGeo } from 'src/interfaces';
import * as geoIp from "geoip-lite"
@Injectable()
export class LocationMiddleware implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    ip.toString()

    console.log(ip)
    const location: IGeo = await ipLocation.fetch(ip).catch((err) => {
      throw err;
    });
    req.location = location
    console.log(req.location)

    next();
  }
}

export const locationLogger = async (req, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  ip.toString()

  const userIp = ip.split(',')[0]

  console.log(userIp)
  const location: IGeo = await ipLocation.fetch(userIp).catch((err) => {
    throw err;
  });
  req.location = location
  console.log(req.location)

  next();
}

export const locationLoggerGeo = async (req, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  ip.toString()

  console.log(ip)
  const location: IGeo = await geoIp.lookup(ip)
  req.location = location
  console.log(req.location)

  next();
}