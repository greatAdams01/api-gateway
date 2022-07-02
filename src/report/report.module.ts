import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ClientsModule, Transport } from  "@nestjs/microservices"
import config from 'src/utils/config';

@Module({
  imports: [
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
