import { AuthenticationUseCase } from "@/domain/application/use-cases/authentication";
import { JwtTokenEncrypterService } from "@/infra/auth/jwt-token-encrypter.service";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { HasherService } from "@/infra/services/hasher.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestAuthenticationUseCase extends AuthenticationUseCase {
    constructor(accountRepository: PrismaAccountRepository, hasherService: HasherService, encrypterService: JwtTokenEncrypterService) {
        super({
            repositories: {
                accountRepository: accountRepository,

            },
            services: {
                hasherVerify: hasherService,
                accessTokenEncrypter: encrypterService,
                refreshTokenEncrypter: encrypterService
            }
        })
    }
}