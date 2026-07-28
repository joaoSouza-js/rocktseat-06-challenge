import { Module } from "@nestjs/common";
import { CreateDeliverAccountController } from "../../http/controller/deliver/create-deliver.controller";
import { DeleteDeliverDeliverController } from "../../http/controller/deliver/delete-deliver.controller";
import { NestDeliverUseCaseModule } from "../use-case/nest-deliver-use-case.module";
import { AssignDeliverController } from "@/infra/http/controller/deliver/assign-deliver.controller";
import { MarkDeliverDeliveredUseCaseController } from "@/infra/http/controller/deliver/mark-deliver-delivered.controller";
import { ReturnDeliverUseCaseController } from "@/infra/http/controller/deliver/return-deliver.controller";

@Module({
    imports: [NestDeliverUseCaseModule],
    controllers: [
        CreateDeliverAccountController,
        DeleteDeliverDeliverController,
        AssignDeliverController,
        MarkDeliverDeliveredUseCaseController,
        ReturnDeliverUseCaseController
    ],
})
export class HttpDeliverModule { }