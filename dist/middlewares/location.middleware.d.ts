import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
export declare class LocationMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
