"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const express = require("express");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    const PORT = process.env.PORT || 8000;
    app.use(express.json({ limit: '50mb' }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT, () => {
        common_1.Logger.log(`server started on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map