import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('api/report')
export class ReportController {
  constructor(@Inject('REPORT_SERVICE') private client: ClientProxy){}

  @Post()
  report() {
    this.client.emit('report-camp', 'string')
    return 'Sucess'
  }
}
