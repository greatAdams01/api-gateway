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
import { Affidavit } from './affidavit.schema';
import { Exhibit } from './exhibit.schema';
import { Relative } from './relative.schema';
export declare type ApplicantDocument = Document & Applicant & {
    _id: any;
    _doc: any;
    id: any;
};
export declare class Applicant {
    name: string;
    email: string;
    image: string;
    gender: string;
    state_origin: string;
    state_residence: string;
    lga: string;
    address: string;
    breach_type: string;
    inPrison: boolean;
    daysPlus: boolean;
    monthsPlus: boolean;
    arrested_on: Date;
    arrested_at: string;
    offence_suspected: string;
    case_mates: number;
    itinerary: string;
    station: string;
    station2: string;
    station_duration: number;
    station2_duration: number;
    state_arrest: string;
    beaten: string;
    injured: string;
    bail_amount: number;
    detention_cost_explained: string;
    first_accused: string;
    caseType: string;
    offence_charged: string;
    arraigned_on: Date;
    arraigned_at: string;
    state_arraigned: string;
    adjournment_date: Date;
    dpp: string;
    charge_no: string;
    division: string;
    amount_paid: string;
    contact_form: string;
    affidavit: Affidavit;
    exhibits: Exhibit[];
    relatives: Relative[];
    rep: Record<string, User>;
    lawyer: Record<string, User>;
}
export declare const ApplicantSchema: import("mongoose").Schema<Applicant, import("mongoose").Model<Applicant, any, any, any>, {}, {}, any>;
