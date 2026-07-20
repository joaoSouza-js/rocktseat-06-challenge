import { CreateAccountUseCase } from "@/domain/application/use-cases/create-account";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { HasherService } from "@/infra/services/hasher.service";
import { Injectable } from "@nestjs/common";
@Injectable()
export class NestCreateAccountUseCase extends CreateAccountUseCase {
    constructor(prismaAccountRepository: PrismaAccountRepository, hasherGenerator: HasherService) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository
            },
            services: {
                hasherGenerator: hasherGenerator
            }
        })
    }
}