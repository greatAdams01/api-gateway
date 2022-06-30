import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('api/v3/notification')
export class NotificationController {
  constructor(private readonly noticeService: NotificationService) {}

  @Get()
  findAll() {
    console.log('model');
    return this.noticeService.findAll();
  }
}
