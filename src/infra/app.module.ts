import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config/config';
import { ApiConfigModule } from './modules/app.config.module';
import { PrismaModule } from './modules/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate
    }),
    ApiConfigModule,
    PrismaModule,
  ],


})
export class AppModule { }
