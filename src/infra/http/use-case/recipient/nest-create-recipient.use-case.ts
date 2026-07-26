import { CreateRecipientUseCase } from "@/domain/application/use-cases/recipient/create-recipient";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaRecipientRepository } from "@/infra/database/repositories/prisma-recipient-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestCreateRecipientUseCase extends CreateRecipientUseCase {
    constructor(
        prismaAccountRepository: PrismaAccountRepository,
        prismaRecipientRepository: PrismaRecipientRepository
    ) {
        super({
            repositories: {
                accountRepository: prismaAccountRepository,
                recipientRepository: prismaRecipientRepository
            }
        })
    }
}