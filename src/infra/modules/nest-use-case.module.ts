import { Module } from "@nestjs/common";
import { NestCreateAccountUseCase } from "../http/use-case/nest-create-account.use-case";
import { DataBaseModule } from "./data-base.module";
import { HasherService } from "../services/hasher.service";

@Module({
    imports: [
        DataBaseModule,
    ],
    providers: [NestCreateAccountUseCase, HasherService],
    exports: [NestCreateAccountUseCase],
})
export class NestUseCaseModule { }