import { Module } from "@nestjs/common";
import { CreateAccountController } from "../http/controller/account/create-account.controller";
import { NestUseCaseModule } from "./nest-use-case.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [NestUseCaseModule, AuthModule],
    controllers: [CreateAccountController],
})
export class HttpModule { }