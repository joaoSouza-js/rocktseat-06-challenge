import { Module } from "@nestjs/common";
import { NestCreateAccountUseCase } from "../http/use-case/nest-create-account.use-case";
import { DataBaseModule } from "./data-base.module";
import { HasherService } from "../services/hasher.service";
import { NestCreateDelivererUseCase } from "../http/use-case/nest-create-deliverer.use-case";

@Module({
    imports: [
        DataBaseModule,
    ],
    providers: [NestCreateAccountUseCase, NestCreateDelivererUseCase, HasherService],
    exports: [NestCreateAccountUseCase, NestCreateDelivererUseCase],
})
export class NestUseCaseModule { }