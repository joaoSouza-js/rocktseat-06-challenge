import { Module } from "@nestjs/common";
import { CreateAccountController } from "../http/controller/account/create-account.controller";
import { NestUseCaseModule } from "./nest-use-case.module";
import { AuthModule } from "../auth/auth.module";
import { CreateDelivererAccountController } from "../http/controller/create-deliverer-account.controller";
import { DeleteDelivererAccountController } from "../http/controller/delete-deliverer-account.controller";
import { CreateRecipientAccountController } from "../http/controller/recipient/create-recipient.controller";
import { DeleteRecipientAccountController } from "../http/controller/recipient/delete-recipient.controller";
import { HttpDeliverModule } from "./http-deliver.module";

@Module({
    imports: [NestUseCaseModule, AuthModule, HttpDeliverModule],
    controllers: [
        CreateAccountController,
        CreateDelivererAccountController,
        DeleteDelivererAccountController,
        CreateRecipientAccountController,
        DeleteRecipientAccountController,

    ],
})
export class HttpModule { }
