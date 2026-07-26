import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ApiConfigService } from "../services/api-config.service";
import { JwtStrategy } from "@/infra/auth/jwt.strategy";
import { JwtRefreshStrategy } from "./jwt-refresh.strategy.service";
import { JwtTokenEncrypterService } from "./jwt-token-encrypter.service";
import { DataBaseModule } from "../modules/data-base.module";
import { AuthenticationController } from "./authentication.controller";
import { NestAuthenticationUseCase } from "../http/use-case/nest-authentication.use-case";
import { HasherService } from "../services/hasher.service";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { CreateAccountController } from "../http/controller/account/create-account.controller";
import { NestCreateAccountUseCase } from "../http/use-case/nest-create-account.use-case";


@Module({
    imports: [
        PassportModule,
        DataBaseModule,

        JwtModule.registerAsync({
            inject: [ApiConfigService],
            useFactory: (apiConfigService: ApiConfigService) => ({
                secret: apiConfigService.jwtAccessSecret,
            }),
        }),
    ],

    providers: [
        ApiConfigService,
        JwtTokenEncrypterService,
        JwtStrategy,
        JwtRefreshStrategy,
        NestAuthenticationUseCase,
        NestCreateAccountUseCase,
        HasherService,
        JwtAuthGuard
    ],

    exports: [
        JwtTokenEncrypterService,
    ],

    controllers: [
        AuthenticationController,
        CreateAccountController,
    ]
})
export class AuthModule { }