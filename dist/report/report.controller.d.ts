import { ClientProxy } from '@nestjs/microservices';
export declare class ReportController {
    private client;
    constructor(client: ClientProxy);
    report(): string;
}
