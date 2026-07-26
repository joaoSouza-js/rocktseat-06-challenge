import { CreateDeliverUseCase } from "@/domain/application/use-cases/deliver/create-deliver";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDeliverRepository } from "@/infra/database/repositories/prisma-deliver-repository";
import { PrismaRecipientRepository } from "@/infra/database/repositories/prisma-recipient-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestCreateDeliverUseCase extends CreateDeliverUseCase {
    constructor(
        prismaAccountRepository: PrismaAccountRepository,
        prismaDeliverRepository: PrismaDeliverRepository,
        prismaRecipientRepository: PrismaRecipientRepository,
    ) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository,
                deliverRepository: prismaDeliverRepository,
                recipientRepository: prismaRecipientRepository,
            }
        })
    }
}