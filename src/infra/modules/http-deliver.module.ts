import { Module } from "@nestjs/common";
import { NestUseCaseModule } from "./nest-use-case.module";
import { CreateDeliverAccountController } from "../http/controller/deliver/create-deliver.controller";
import { DeleteDeliverDeliverController } from "../http/controller/deliver/delete-deliver.controller";

@Module({
    imports: [NestUseCaseModule],
    controllers: [
        CreateDeliverAccountController,
        DeleteDeliverDeliverController
    ],
})
export class HttpDeliverModule { }