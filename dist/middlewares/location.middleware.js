"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationLogger = exports.LocationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const ipLocation = require("ip-to-location");
let LocationMiddleware = class LocationMiddleware {
    async use(req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        ip.toString();
        console.log(ip);
        const location = await ipLocation.fetch(ip).catch((err) => {
            throw err;
        });
        req.location = location;
        console.log(req.location);
        next();
    }
};
LocationMiddleware = __decorate([
    (0, common_1.Injectable)()
], LocationMiddleware);
exports.LocationMiddleware = LocationMiddleware;
const locationLogger = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    ip.toString();
    console.log(ip);
    const location = await ipLocation.fetch(ip).catch((err) => {
        throw err;
    });
    req.location = location;
    console.log(req.location);
    next();
};
exports.locationLogger = locationLogger;
//# sourceMappingURL=location.middleware.js.map