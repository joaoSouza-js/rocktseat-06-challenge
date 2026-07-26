import { NestCreateRecipientUseCase } from "@/infra/http/use-case/recipient/nest-create-recipient.use-case";
import { NestDeleteRecipientUseCase } from "@/infra/http/use-case/recipient/nest-delete-recipient.use-case";
import { Module } from "@nestjs/common";
import { DataBaseModule } from "../data-base.module";

@Module({
    imports: [DataBaseModule],
    providers: [NestCreateRecipientUseCase, NestDeleteRecipientUseCase],
    exports: [NestCreateRecipientUseCase, NestDeleteRecipientUseCase],
})
export class NestRecipientUseCaseModule { }
