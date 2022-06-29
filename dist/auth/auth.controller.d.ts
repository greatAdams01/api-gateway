import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReqWithUser } from 'src/typings';
import { ChangePasswordDTO, RegisterWithEmailDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private client;
    private readonly authService;
    constructor(client: ClientProxy, authService: AuthService);
    home(): string;
    me(req: ReqWithUser): Promise<import("../user/entity/user.schema").UserDocument>;
    accumulate(): Observable<number>;
    login(data: {
        email?: string;
        phone?: string;
        password: string;
    }): Promise<{
        id: any;
        token: string;
        isActive: boolean;
    }>;
    register(data: RegisterWithEmailDTO): Promise<{
        user: Partial<import("../user/entity/user.schema").UserDocument>;
        token: string;
        isActive: boolean;
    }>;
    registerWithGoogleAndFacebook(data: any): Promise<{
        id: any;
        token: string;
    }>;
    googleAndFacebook(req: ReqWithUser, data: any): Promise<{
        id: any;
        token: string;
    }>;
    forgotPassword(data: {
        email: string;
    }): Promise<any>;
    verifyToken(data: {
        token: string;
    }): Promise<any>;
    resendToken(data: {
        email: string;
    }): Promise<any>;
    changePassword(data: ChangePasswordDTO): Promise<{
        id: any;
        email: string;
    }>;
}
