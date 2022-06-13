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
import { AssignUserAdminDTO, ChangeUserAccountTypeDTO, ChangeUserRoleDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: any;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        accountType: import("./dto/user.dto").AccountTypeEnum;
        role: import("./dto/user.dto").StaffRoleEnum;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<import("./entity/user.schema").UserDocument>;
    updateUser(data: UpdateUserDTO): Promise<any>;
    assign(data: AssignUserAdminDTO): Promise<any>;
    changeRole(data: ChangeUserRoleDTO): Promise<{
        id: any;
        role: import("./dto/user.dto").StaffRoleEnum;
    }>;
    changeAccountType(data: ChangeUserAccountTypeDTO): Promise<{
        id: any;
        accountType: import("./dto/user.dto").AccountTypeEnum;
    }>;
    upload(data: {
        image: string;
    }, req: ReqWithUser): Promise<string>;
    uploadImage(data: {
        image: string;
        id: string;
    }): Promise<import("./entity/user.schema").UserDocument>;
    activateUser(data: {
        id: string;
    }): Promise<{
        isActive: boolean;
        id: any;
    }>;
    deleteUser(id: string): Promise<any>;
    blockUser(data: {
        id: string;
    }): Promise<import("./entity/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    }>;
    seedUser(): Promise<(import("./entity/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    })[]>;
}
