import { FetchRecipientDeliverUseCase } from "@/domain/application/use-cases/deliver/fetch-recipient-deliver";
import { PrismaAccountRepository } from "@/infra/database/repositories/prisma-account-repository";
import { PrismaDeliverRepository } from "@/infra/database/repositories/prisma-deliver-repository";
import { Injectable } from "@nestjs/common";
@Injectable()
export class NestFetchDeliverByRecipientUseCase extends FetchRecipientDeliverUseCase {
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