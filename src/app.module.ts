import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import config from './utils/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EnvModule } from './env/env.module';

@Module({

  imports: [
    MongooseModule.forRoot(config.MONGO_URI, {
      // connectionFactory: (connection: Connection) => {
      //   connection.useDb('test');

      //   console.log(connection);
      //   return connection;
      // },
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      installSubscriptionHandlers: true,
      path: '/api/v3/graphql',
      cors: false,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),

    AuthModule,
    UserModule,
    EnvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
