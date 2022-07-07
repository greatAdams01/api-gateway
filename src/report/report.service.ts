import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDocumentRMQ, ReportRMQ } from './schema/reportRMQ.schema';

@Injectable()
export class ReportService {
  constructor(
    @Inject('REPORT_SERVICE') private client: ClientProxy,
    // @InjectModel( ReportRMQ.name) private readonly reportModelRMQ:  Model<ReportDocumentRMQ>
    ){}

  sendReport(data) {
    this.client.emit('report-camp', data)
  }

  resolveReport(slug) {
    this.client.emit('resove-camp-report', slug)
  }

}
