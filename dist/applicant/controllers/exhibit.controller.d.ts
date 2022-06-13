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
import { CreateExhibitDTO, UpdateExhibitDTO } from '../dto/exhibit.dto';
import { ExhibitService } from '../services/exhibit.service';
export declare class ExhibitController {
    private readonly exhibitService;
    constructor(exhibitService: ExhibitService);
    create(data: CreateExhibitDTO): Promise<import("../schema/exhibit.schema").Exhibit>;
    findAll(): Promise<import("../schema/exhibit.schema").Exhibit[]>;
    findOne(id: string): Promise<import("../schema/exhibit.schema").Exhibit>;
    update(data: UpdateExhibitDTO): Promise<import("../schema/exhibit.schema").Exhibit>;
    delete(id: string): Promise<import("../schema/exhibit.schema").Exhibit>;
    findByApplicant(id: string): Promise<import("../schema/exhibit.schema").Exhibit[]>;
    seedExhibits(): Promise<(import("../schema/exhibit.schema").Exhibit & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
