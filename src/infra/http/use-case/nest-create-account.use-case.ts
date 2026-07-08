import { CreateAccountUseCase } from "@/domain/application/use-cases/create-account";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { HasherService } from "@/infra/services/hasher.service";

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