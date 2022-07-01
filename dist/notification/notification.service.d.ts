import { Model } from 'mongoose';
import { Notice, NoticeDocument } from './notification.schema';
export declare class NotificationService {
    private readonly noticeModel;
    constructor(noticeModel: Model<NoticeDocument>);
    findAll(model?: string): Promise<(Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
