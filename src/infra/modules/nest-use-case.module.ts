import { Module } from "@nestjs/common";
import { NestCreateAccountUseCase } from "../http/use-case/nest-create-account.use-case";
import { DataBaseModule } from "./data-base.module";
import { HasherService } from "../services/hasher.service";
import { NestCreateDelivererUseCase } from "../http/use-case/nest-create-deliverer.use-case";
import { NestDeleteDelivererUseCase } from "../http/use-case/nest-delete-deliverer.use-case";
import { NestCreateRecipientUseCase } from "../http/use-case/recipient/nest-create-recipient.use-case";
import { NestDeleteRecipientUseCase } from "../http/use-case/recipient/nest-delete-recipient.use-case";

@Module({
    imports: [DataBaseModule],
    providers: [
        NestCreateAccountUseCase,
        NestCreateDelivererUseCase,
        HasherService,
        NestDeleteDelivererUseCase,
        NestCreateRecipientUseCase,
        NestDeleteRecipientUseCase
    ],
    exports: [
        NestCreateAccountUseCase,
        NestCreateDelivererUseCase,
        NestDeleteDelivererUseCase,
        NestCreateRecipientUseCase,
        NestDeleteRecipientUseCase
    ],
})
export class NestUseCaseModule { }
