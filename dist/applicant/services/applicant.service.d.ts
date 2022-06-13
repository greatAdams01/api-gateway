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
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { ReqWithUser } from 'src/typings';
import { UserDocument } from 'src/user/entity/user.schema';
import { AssignApplicantDTO, CreateApplicantDTO, UpdateApplicantDTO, UploadContactFormDTO } from '../dto/applicant.dto';
import { AffidavitDocument } from '../schema/affidavit.schema';
import { Applicant, ApplicantDocument } from '../schema/applicant.shema';
import { ReportService } from './report.service';
export declare class ApplicantService {
    private readonly reportService;
    private readonly applicantRepo;
    private readonly userModel;
    private readonly affidavitModel;
    private readonly cacheManager;
    private readonly req;
    constructor(reportService: ReportService, applicantRepo: Model<ApplicantDocument>, userModel: Model<UserDocument>, affidavitModel: Model<AffidavitDocument>, cacheManager: Cache, req: ReqWithUser);
    findAll(user?: UserDocument): Promise<Applicant[]>;
    findByUser(id: any): Promise<ApplicantDocument[]>;
    create(data: CreateApplicantDTO, user: UserDocument): Promise<Applicant>;
    findOne(id: string): Promise<Applicant>;
    delete(id: string): Promise<Applicant>;
    update(data: Partial<UpdateApplicantDTO>): Promise<Applicant>;
    assignToUser(data: AssignApplicantDTO): Promise<ApplicantDocument>;
    addAffidavit(applicant_id: string, affidavit_id: string): Promise<void>;
    addExhibit(applicant_id: string, exhibit_id: string): Promise<void>;
    removeExhibit(applicant_id: string, exhibit_id: string): Promise<void>;
    addRelative(applicant_id: string, relative_id: string): Promise<void>;
    removeRelative(applicant_id: string, relative_id: string): Promise<void>;
    uploadContactForm(data: UploadContactFormDTO): Promise<Applicant>;
    getDraft(applicant_id: any): Promise<Applicant>;
    countApplicantsByUser(user_id: any): Promise<number>;
    seedApplicants(): Promise<(import("mongoose").Document<any, any, any> & Applicant & {
        _id: any;
        _doc: any;
        id: any;
    } & {
        _id: any;
    })[]>;
}
