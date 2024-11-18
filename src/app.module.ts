import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import databaseConfig from './config/database.config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { GamesModule } from './games/games.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication.guard';
import { CollectionsModule } from './collections/collections.module';
import { CollectionsGamesModule } from './collections-games/collections-games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UsersModule,
    AuthenticationModule,
    GamesModule,
    CollectionsModule,
    CollectionsGamesModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
