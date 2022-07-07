import { reportDTO } from './report.dto';
import { ConfigService } from '@nestjs/config';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    private readonly configService;
    private readonly reportURL;
    constructor(reportService: ReportService, configService: ConfigService);
    getAllReports(): Promise<any>;
    report(data: reportDTO): string;
    resolvedReport(param: any): string;
    getCampainReports(param: any): Promise<any>;
}
