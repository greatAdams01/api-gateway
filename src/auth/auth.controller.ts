import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { ISession, ReqWithUser } from 'src/typings';
import {
  ChangePasswordDTO,
  LoginWithEmailDTO,
  RegisterWithEmailDTO,
} from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RestAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('MAIL_SERVICE') private client: ClientProxy,
    private readonly authService: AuthService
    ) {}
  @Get()
  home() {
    return 'Welcome to auth';
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: ReqWithUser) {
    return req.user;
  }

  @Get('sum')
  accumulate():Observable<number> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);
  }


  @Post('login')
  @ApiParam({
    type: LoginWithEmailDTO,
    name: 'login',
  })
  async login(@Body() data: { email?: string; phone?:string; password: string }) {
    const result = await this.authService.loginWithEmail(
      data.email,
      data.phone,
      data.password,
    );

    return {
      id: result.user.id,
      token: result.token,
      isActive: result.user.isActive,
    };
  }

  @Post('register')
  async register(
    @Body() data: RegisterWithEmailDTO,
  ) {
    const result = await this.authService.registerWithEmail({
      ...data
    });

    return {
      user: result.user,
      token: result.token,
      isActive: result.user.isActive,
    };
  }
  @Post('register-google')
  async registerWithGoogleAndFacebook(@Body() data: any) {
    const result = await this.authService.registerWithGoogleAndFacebook(data);

    return { id: result.user.id, token: result.token };
  }

  @Post('google-facebook')
  async googleAndFacebook(@Req() req: ReqWithUser, @Body() data: any) {
    const result = await this.authService.registerWithGoogleAndFacebook(data);
    return { id: result.user.id, token: result.token };
  }

  // @Get('logout')
  // logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   req.logOut();
  //   res.clearCookie('__ed');
  //   res.clearCookie('token');
  //   req.session.destroy((err) => {
  //     if (err) throw err;
  //   });
  //   return 'Okay';
  // }
  @Post('forgot-password')
  async forgotPassword(@Body() data: { email: string }) {
    const user = await this.authService.forgotPassword(data.email);
    return user?.id;
  }
  @Post('verify-token')
  async verifyToken(@Body() data: { token: string }) {
    const user = await this.authService.verifyToken(data.token);
    return user?.id;
  }
  @Post('resend-token')
  async resendToken(@Body() data: { email: string }) {
    const user = await this.authService.resendVerificationToken(data.email);
    return user.id;
  }
  @UseGuards(RestAuthGuard)
  @Post('change-password')
  async changePassword(@Body() data: ChangePasswordDTO) {
    const user = await this.authService.changePassword(data);
    return { id: user.id, email: user.email };
  }
}
