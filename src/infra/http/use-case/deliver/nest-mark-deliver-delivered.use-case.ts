import { MarkDeliverDeliveredUseCase } from "@/domain/application/use-cases/deliver/mark-deliver-delivered";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDeliverRepository } from "@/infra/database/repositories/prisma-deliver-repository";
import { PrismaDelivererRepository } from "@/infra/database/repositories/prisma-deliverer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestMarkDeliverDeliveredUseCase extends MarkDeliverDeliveredUseCase {
    constructor(
        prismaAccountRepository: PrismaAccountRepository,
        prismaDeliverRepository: PrismaDeliverRepository,
        prismaDelivererRepository: PrismaDelivererRepository
    ) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository,
                deliverRepository: prismaDeliverRepository,
                delivererRepository: prismaDelivererRepository
            }
        })
    }
}