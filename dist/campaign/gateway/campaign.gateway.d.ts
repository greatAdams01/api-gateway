import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { Server } from 'ws';
import { CampaignDocument } from '../schema/campaign.schema';
export declare class CampaignGateway implements OnGatewayConnection, OnGatewayInit {
    private noticeModel;
    private readonly campaignModel;
    constructor(noticeModel: Model<NoticeDocument>, campaignModel: Model<CampaignDocument>);
    server: Server;
    handleConnection(): void;
    afterInit(server: Server): void;
    createdCampaign(data: {
        campaignTitle: string;
        user: UserDocument;
    }): Promise<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    }>;
    endorsedCampaign(data: {
        campaignTitle: string;
        user: UserDocument;
    }): Promise<Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    }>;
    getCampaignNotice(): Promise<any>;
    getAllNotice(model?: string): Promise<any>;
}
