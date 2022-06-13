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
import { Model } from 'mongoose';
import { CreateAffidavitDTO, UpdateAffidavitDTO } from '../dto/affidavit.dto';
import { Affidavit, AffidavitDocument } from '../schema/affidavit.schema';
import { ApplicantDocument } from '../schema/applicant.shema';
export declare class AffidavitService {
    private readonly affidavitRepo;
    private readonly applicantModel;
    constructor(affidavitRepo: Model<AffidavitDocument>, applicantModel: Model<ApplicantDocument>);
    findAll(): Promise<Affidavit[]>;
    findByApplicant(applicant_id: any): Promise<Affidavit>;
    findOne(id: string): Promise<Affidavit>;
    create(data: Partial<CreateAffidavitDTO | UpdateAffidavitDTO>): Promise<Affidavit>;
    update(data: Partial<UpdateAffidavitDTO>): Promise<Affidavit>;
    deleteAffidavit(id: string): Promise<Affidavit>;
    deleteAllAffidavitWithoutApplicants(): Promise<Affidavit[]>;
    seedAffidavit(): Promise<(import("mongoose").Document<unknown, any, AffidavitDocument> & Affidavit & Document & {
        _id: any;
        id: any;
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
