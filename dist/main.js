"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieSession = require("express-session");
const passport = require("passport");
const express = require("express");
const app_module_1 = require("./app.module");
const config_1 = require("./utils/config");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v3/');
    const devOrigins = [
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'localho.st:3000',
    ];
    const prodOrigins = [
        'https://edfhr.org',
        'http://edfhr.org',
        'https://team.edfhr.org',
        'https://portal.edfhr.org',
        'https://portal-dev.edfhr.org',
        /\.edfhr\.org$/,
    ];
    const origin = devOrigins;
    app.enableCors({
        origin,
        credentials: true,
    });
    app.use(cookieParser());
    app.use(cookieSession({
        secret: config_1.default.SECRET,
        name: '__ed',
        saveUninitialized: true,
        resave: false,
        store: MongoStore.create({
            mongoUrl: config_1.default.MONGO_URI,
            ttl: 14 * 24 * 60 * 60,
            autoRemove: 'disabled',
        }),
    }));
    const PORT = process.env.PORT || 8000;
    app.use(express.json({ limit: '50mb' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT, () => {
        common_1.Logger.log(`server started on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map