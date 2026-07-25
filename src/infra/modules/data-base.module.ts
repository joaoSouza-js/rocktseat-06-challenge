import { Module } from "@nestjs/common";
import { PrismaAccountRepository } from "../database/repositories/prisma-account-repository";
import { PrismaModule } from "./prisma.module";
import { PrismaDelivererRepository } from "../database/repositories/prisma-deliverer-repository";

@Module({
    imports: [PrismaModule],
    providers: [PrismaAccountRepository, PrismaDelivererRepository],
    exports: [PrismaAccountRepository, PrismaDelivererRepository]
})
export class DataBaseModule { }