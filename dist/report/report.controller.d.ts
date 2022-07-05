import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReportDocument } from 'src/applicant/schema/report.schema';
import { reportDTO } from './report.dto';
export declare class ReportController {
    private client;
    constructor(client: ClientProxy);
    report(data: reportDTO): string;
    resolvedReport(param: any): string;
    getCampainReports(param: any): Observable<ReportDocument[]>;
}
