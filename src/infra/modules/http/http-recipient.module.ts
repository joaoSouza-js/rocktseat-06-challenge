import { Module } from "@nestjs/common";
import { CreateRecipientAccountController } from "../../http/controller/recipient/create-recipient.controller";
import { NestRecipientUseCaseModule } from "../use-case/nest-recipient-use-case.module";
import { DeleteRecipientAccountController } from "@/infra/http/controller/recipient/delete-recipient.controller";

@Module({
    imports: [NestRecipientUseCaseModule],
    controllers: [
        CreateRecipientAccountController,
        DeleteRecipientAccountController
    ],
})
export class HttpRecipientModule { }