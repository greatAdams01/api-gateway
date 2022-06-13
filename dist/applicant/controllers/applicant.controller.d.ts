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
/// <reference types="mongoose" />
import { ReqWithUser } from 'src/typings';
import { AssignApplicantDTO, CreateApplicantDTO, UpdateApplicantDTO, UploadContactFormDTO } from '../dto/applicant.dto';
import { ApplicantService } from '../services/applicant.service';
export declare class ApplicantController {
    private readonly applicantService;
    constructor(applicantService: ApplicantService);
    create(data: CreateApplicantDTO, req: ReqWithUser): Promise<import("../schema/applicant.shema").Applicant>;
    findAll(req: ReqWithUser): Promise<import("../schema/applicant.shema").Applicant[]>;
    findOne(id: string): Promise<import("../schema/applicant.shema").Applicant>;
    draft(id: string): Promise<import("../schema/applicant.shema").Applicant>;
    updateApplicant(data: UpdateApplicantDTO): Promise<import("../schema/applicant.shema").Applicant>;
    delete(id: string): Promise<import("../schema/applicant.shema").Applicant>;
    assign(data: AssignApplicantDTO): Promise<{
        name: string;
        id: any;
    }>;
    uploadContactForm(data: UploadContactFormDTO): Promise<import("../schema/applicant.shema").Applicant>;
    seedApplicants(): Promise<(import("mongoose").Document<any, any, any> & import("../schema/applicant.shema").Applicant & {
        _id: any;
        _doc: any;
        id: any;
    } & {
        _id: any;
    })[]>;
}
