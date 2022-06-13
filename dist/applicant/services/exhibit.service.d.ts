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
import { CreateExhibitDTO, UpdateExhibitDTO } from '../dto/exhibit.dto';
import { Exhibit, ExhibitDocument } from '../schema/exhibit.schema';
export declare class ExhibitService {
    private readonly exhibitModel;
    constructor(exhibitModel: Model<ExhibitDocument>);
    create(data: CreateExhibitDTO): Promise<Exhibit>;
    findAll(): Promise<Exhibit[]>;
    findByApplicant(applicant_id: any): Promise<Exhibit[]>;
    findOne(id: string): Promise<Exhibit>;
    update(data: UpdateExhibitDTO): Promise<Exhibit>;
    deleteOne(id: string): Promise<Exhibit>;
    seedExhibits(): Promise<(Exhibit & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
