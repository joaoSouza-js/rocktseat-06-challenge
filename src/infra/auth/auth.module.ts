import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ApiConfigService } from "../services/api-config.service";
import { JwtStrategy } from "@/domain/application/services/auth/jwt.strategy";
import { JwtRefreshStrategy } from "./jwt-refresh.strategy.service";
import { JwtTokenEncrypterService } from "./jwt-token-encrypter.service";
import { DataBaseModule } from "../modules/data-base.module";
import { AuthenticationController } from "./authentication.controller";
import { NestAuthenticationUseCase } from "../http/use-case/nest-authentication.use-case";
import { HasherService } from "../services/hasher.service";


@Module({
    imports: [
        PassportModule,
        DataBaseModule,

        JwtModule.register({}),
    ],

    providers: [
        ApiConfigService,
        JwtTokenEncrypterService,
        JwtStrategy,
        JwtRefreshStrategy,
        NestAuthenticationUseCase,
        HasherService
    ],

    exports: [
        JwtTokenEncrypterService,
    ],

    controllers: [
        AuthenticationController
    ]
})
export class AuthModule { }