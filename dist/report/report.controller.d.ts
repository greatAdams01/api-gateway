import { ClientProxy } from '@nestjs/microservices';
import { reportDTO } from './report.dto';
export declare class ReportController {
    private client;
    constructor(client: ClientProxy);
    report(data: reportDTO): string;
}
