import { Body, Controller, Get, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReportDocument } from 'src/applicant/schema/report.schema';
import axios from 'axios';
import { reportDTO } from './report.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReportService } from './report.service';



@Controller('api/report')
export class ReportController {
  private readonly reportURL: string
  constructor(
    private readonly reportService: ReportService,
    private readonly configService: ConfigService
    ){

      this.reportURL = this.configService.get<string>('reportServerURL')
    }

  @Get()
  async getAllReports() {
    try {
      console.log(this.reportURL)
      const { data } = await axios.get(`${this.reportURL}/report`)
      return data
    } catch (error) {
      console.log(error) 
    }
  }

  @Post()
  report(@Body() data: reportDTO ) {
    // console.log(data)
    this.reportService.sendReport(data)
    return 'Sucess'
  }

  @Put('/:reportId')
  resolvedReport(@Param() param ) {
    try {
      const slug = param.reportId
      this.reportService.resolveReport(slug)
      return 'Sucess'
    } catch (error) {
      console.log(error)
    }
  }

  @Post('/:campaignSlug')
  async getCampainReports(@Param() param) {
    const slug = param.campaignSlug
    // const pattern = { cmd: 'camp-reports' };
    // const payload = slug;
    // console.log(payload)
   try {
    const { data } = await axios.get(`${this.reportURL}/report/${slug}`)
    return data
    } catch (error) {
    console.log(error)
   }
   
  }


}
