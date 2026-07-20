import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config/config';
import { ApiConfigModule } from './modules/app.config.module';
import { HttpModule } from './modules/http.module';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './filters/prisma-exception-filter';
import { UseCaseExceptionFilter } from './filters/use-case-exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate
    }),
    ApiConfigModule,
    HttpModule,

  ],

  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: UseCaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],


})
export class AppModule { }
