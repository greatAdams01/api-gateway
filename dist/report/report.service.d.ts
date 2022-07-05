import { RmqContext } from '@nestjs/microservices';
export declare class ReportService {
    getNotifications(data: number[], context: RmqContext): void;
}
