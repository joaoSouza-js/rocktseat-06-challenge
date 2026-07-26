import { Module } from "@nestjs/common";
import { CreateAccountController } from "../http/controller/account/create-account.controller";
import { NestUseCaseModule } from "./nest-use-case.module";
import { AuthModule } from "../auth/auth.module";
import { CreateDelivererAccountController } from "../http/controller/create-deliverer-account.controller";
import { DeleteDelivererAccountController } from "../http/controller/delete-deliverer-account.controller";

@Module({
    imports: [NestUseCaseModule, AuthModule],
    controllers: [CreateAccountController, CreateDelivererAccountController, DeleteDelivererAccountController],
})
export class HttpModule { }