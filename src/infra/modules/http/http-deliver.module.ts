import { Module } from "@nestjs/common";
import { CreateDeliverAccountController } from "../../http/controller/deliver/create-deliver.controller";
import { DeleteDeliverDeliverController } from "../../http/controller/deliver/delete-deliver.controller";
import { NestDeliverUseCaseModule } from "../use-case/nest-deliver-use-case.module";

@Module({
    imports: [NestDeliverUseCaseModule],
    controllers: [
        CreateDeliverAccountController,
        DeleteDeliverDeliverController
    ],
})
export class HttpDeliverModule { }