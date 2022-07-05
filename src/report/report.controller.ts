import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { reportDTO } from './report.dto';

@Controller('api/report')
export class ReportController {
  constructor(@Inject('REPORT_SERVICE') private client: ClientProxy){}

  @Post()
  report(@Body() data: reportDTO ) {
    console.log(data)
    this.client.emit('report-camp', 'string')
    return 'Sucess'
  }
}
