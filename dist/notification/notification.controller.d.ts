import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly noticeService;
    constructor(noticeService: NotificationService);
    findAll(): Promise<(import("./notification.schema").Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
