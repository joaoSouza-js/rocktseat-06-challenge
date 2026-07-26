import { Module } from "@nestjs/common";
import { PrismaAccountRepository } from "../database/repositories/prisma-account-repository";
import { PrismaModule } from "./prisma.module";
import { PrismaDelivererRepository } from "../database/repositories/prisma-deliverer-repository";
import { PrismaRecipientRepository } from "../database/repositories/prisma-recipient-repository";
import { PrismaDeliverRepository } from "../database/repositories/prisma-deliver-repository";

@Module({
    imports: [PrismaModule],
    providers: [
        PrismaAccountRepository,
        PrismaDelivererRepository,
        PrismaRecipientRepository,
        PrismaDeliverRepository
    ],
    exports: [
        PrismaAccountRepository,
        PrismaDelivererRepository,
        PrismaRecipientRepository,
        PrismaDeliverRepository
    ],
})
export class DataBaseModule { }
