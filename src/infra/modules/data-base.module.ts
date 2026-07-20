import { Module } from "@nestjs/common";
import { PrismaAccountRepository } from "../database/repositories/prisma-account-repository";
import { PrismaModule } from "./prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [PrismaAccountRepository],
    exports: [PrismaAccountRepository]
})
export class DataBaseModule { }