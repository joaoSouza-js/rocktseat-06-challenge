import { Module } from "@nestjs/common";
import { NestCreateAccountUseCase } from "../http/use-case/nest-create-account.use-case";
import { DataBaseModule } from "./data-base.module";
import { HasherService } from "../services/hasher.service";
import { NestCreateDelivererUseCase } from "../http/use-case/nest-create-deliverer.use-case";
import { NestDeleteDelivererUseCase } from "../http/use-case/nest-delete-deliverer.use-case";

@Module({
    imports: [DataBaseModule],
    providers: [
        NestCreateAccountUseCase,
        NestCreateDelivererUseCase,
        HasherService,
        NestDeleteDelivererUseCase,
    ],
    exports: [
        NestCreateAccountUseCase,
        NestCreateDelivererUseCase,
        NestDeleteDelivererUseCase,
    ],
})
export class NestUseCaseModule { }
