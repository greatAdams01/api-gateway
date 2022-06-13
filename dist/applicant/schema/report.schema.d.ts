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
import { Document } from 'mongoose';
import { User } from 'src/user/entity/user.schema';
import { Applicant } from './applicant.shema';
export declare type ReportDocument = Report & Document;
export declare type RepCommentDocument = RepComment & Document;
export declare class Report {
    applicant_id: Record<string, Applicant>;
    author: Record<string, User>;
    title: string;
    status: boolean;
    content: string;
    comments: RepComment[];
}
export declare class RepComment {
    report: Report;
    author: Record<string, User>;
    status: boolean;
    content: string;
}
export declare const ReportSchema: import("mongoose").Schema<Report, import("mongoose").Model<Report, any, any, any>, {}, {}, any>;
export declare const RepCommentSchema: import("mongoose").Schema<RepComment, import("mongoose").Model<RepComment, any, any, any>, {}, {}, any>;
