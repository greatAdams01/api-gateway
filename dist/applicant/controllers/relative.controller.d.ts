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
import { CreateRelativeDTO, UpdateRelativeDTO } from '../dto/relative.dto';
import { RelativeService } from '../services/relative.service';
export declare class RelativeController {
    private readonly relativeService;
    constructor(relativeService: RelativeService);
    create(data: CreateRelativeDTO): Promise<import("../schema/relative.schema").Relative>;
    update(data: UpdateRelativeDTO): Promise<import("../schema/relative.schema").Relative>;
    delete(id: string): Promise<import("../schema/relative.schema").Relative>;
    findAll(): Promise<import("../schema/relative.schema").Relative[]>;
    findOne(id: string): Promise<import("../schema/relative.schema").Relative>;
    findByApplicant(id: string): Promise<import("../schema/relative.schema").Relative[]>;
    seedRelatives(): Promise<(import("../schema/relative.schema").Relative & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
