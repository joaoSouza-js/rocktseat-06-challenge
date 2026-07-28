import { DeleteDelivererUseCase } from "@/domain/application/use-cases/deliverer/delete-deliverer";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDelivererRepository } from "@/infra/database/repositories/prisma-deliverer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestDeleteDelivererUseCase extends DeleteDelivererUseCase {
    constructor(
        prismaAccountRepository: PrismaAccountRepository,
        prismaDelivererRepository: PrismaDelivererRepository,
    ) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository,
                delivererRepository: prismaDelivererRepository
            }
        })
    }
}