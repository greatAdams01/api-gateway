import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/user/entity/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    validate(payload: {
        email: string;
        sub: string;
    }): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
        _doc: any;
    } & {
        _id: any;
    }>;
}
export {};
