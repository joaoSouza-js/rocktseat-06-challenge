import { FetchDelivererDeliverUseCase } from "@/domain/application/use-cases/deliver/fetch-deliverer-deliver";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDeliverRepository } from "@/infra/database/repositories/prisma-deliver-repository";
import { PrismaDelivererRepository } from "@/infra/database/repositories/prisma-deliverer-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestFetchDeliverByDeliverUseCase extends FetchDelivererDeliverUseCase {
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