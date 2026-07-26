import { Module } from "@nestjs/common";
import { PrismaAccountRepository } from "../database/repositories/prisma-account-repository";
import { PrismaModule } from "./prisma.module";
import { PrismaDelivererRepository } from "../database/repositories/prisma-deliverer-repository";
import { PrismaRecipientRepository } from "../database/repositories/prisma-recipient-repository";

@Module({
    imports: [PrismaModule],
    providers: [
        PrismaAccountRepository,
        PrismaDelivererRepository,
        PrismaRecipientRepository,
    ],
    exports: [
        PrismaAccountRepository,
        PrismaDelivererRepository,
        PrismaRecipientRepository,
    ],
})
export class DataBaseModule { }
