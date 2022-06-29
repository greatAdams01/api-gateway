import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {
  Applicant,
  ApplicantSchema,
} from 'src/applicant/schema/applicant.shema';
import { LocationMiddleware } from 'src/middlewares/location.middleware';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { UserService } from 'src/user/user.service';
import config from 'src/utils/config';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy, SessionSerializer } from './strategies/jwt.strategy'; 
import { ClientsModule, Transport } from  "@nestjs/microservices"

@Module({
  providers: [
    JwtStrategy,
    SessionSerializer,
    AuthResolver,
    AuthService,
    UserService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Applicant.name, schema: ApplicantSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.SECRET || 'khdkdkfkfkfk',
      // signOptions: { expiresIn: '1d' },
    }),
    CacheModule.register(),
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [config.RMQ_URL],
          queue: 'mail_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ])
  ],

  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocationMiddleware).forRoutes(AuthController);
  }
}
