import { Module } from "@nestjs/common";
import { PrismaAccountRepository } from "../database/repositories/prisma-account-repository";
import { PrismaModule } from "./prisma.module";
import { PrimsDelivererRepository } from "../database/repositories/prisma-deliverer-repository";

@Module({
    imports: [PrismaModule],
    providers: [PrismaAccountRepository, PrimsDelivererRepository],
    exports: [PrismaAccountRepository, PrimsDelivererRepository]
})
export class DataBaseModule { }