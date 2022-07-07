import { ClientProxy } from '@nestjs/microservices';
export declare class ReportService {
    private client;
    constructor(client: ClientProxy);
    sendReport(data: any): void;
    resolveReport(slug: any): void;
}
