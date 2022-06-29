/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
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
