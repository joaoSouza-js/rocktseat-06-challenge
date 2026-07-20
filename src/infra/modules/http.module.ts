import { Module } from "@nestjs/common";
import { CreateAccountController } from "../http/controller/account/create-account.controller";
import { NestUseCaseModule } from "./nest-use-case.module";

@Module({
    imports: [NestUseCaseModule],
    controllers: [CreateAccountController],
})
export class HttpModule { }