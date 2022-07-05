import { Body, Controller, Get, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReportDocument } from 'src/applicant/schema/report.schema';
import { reportDTO } from './report.dto';

@Controller('api/report')
export class ReportController {
  constructor(@Inject('REPORT_SERVICE') private client: ClientProxy){}

  @Post()
  report(@Body() data: reportDTO ) {
    // console.log(data)
    this.client.emit('report-camp', data)
    return 'Sucess'
  }

  @Put('/:reportId')
  resolvedReport(@Param() param ) {
    const slug = param.reportId
    this.client.emit('resove-camp-report', slug)
    return 'Sucess'
  }

  @Get('/:campaignSlug')
  getCampainReports(@Param() param): Observable<ReportDocument[]> {
    const slug = param.campaignSlug
    const pattern = { cmd: 'camp-reports' };
    const payload = slug;
    // console.log(payload)
    return this.client.send<ReportDocument[]>(pattern, payload);
  }

}
