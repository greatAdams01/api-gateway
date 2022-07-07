import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ClientsModule, Transport } from  "@nestjs/microservices"
import config from 'src/utils/config';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportRMQ, ReportSchemaRMQ } from './schema/reportRMQ.schema';

@Module({
  providers:[ReportService],
  imports: [
    MongooseModule.forFeature([
      { name: ReportRMQ.name, schema: ReportSchemaRMQ },
      // { name: RepComment.name, schema: RepCommentSchema },
    ]),
    ClientsModule.register([
      {
        name: 'REPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [config.RMQ_URL],
          queue: 'report_queue',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ])

  ],
  controllers: [ReportController]
})
export class ReportModule {}
