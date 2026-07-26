import { DeleteDeliverUseCase } from "@/domain/application/use-cases/deliver/delete-deliver";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDeliverRepository } from "@/infra/database/repositories/prisma-deliver-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestDeleteDeliverUseCase extends DeleteDeliverUseCase {
    constructor(
        prismaAccountRepository: PrismaAccountRepository,
        prismaDeliverRepository: PrismaDeliverRepository,
    ) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository,
                deliverRepository: prismaDeliverRepository,
            }
        })
    }
}