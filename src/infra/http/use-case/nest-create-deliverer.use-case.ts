import { CreateDelivererUseCase } from "@/domain/application/use-cases/deliverer/create-deliverer";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDelivererRepository } from "@/infra/database/repositories/prisma-deliverer-repository";
import { HasherService } from "@/infra/services/hasher.service";

export class NestCreateDelivererUseCase extends CreateDelivererUseCase {
    constructor(
        hasherGenerator: HasherService,
        prismaAccountRepository: PrismaAccountRepository,
        prismaDelivererRepository: PrismaDelivererRepository,
    ) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository,
                delivererRepository: prismaDelivererRepository,
            },
            services: {
                hasherGenerator,
            },
        });
    }
}
