import { Module } from "@nestjs/common";
import { CreateDeliverAccountController } from "../../http/controller/deliver/create-deliver.controller";
import { DeleteDeliverDeliverController } from "../../http/controller/deliver/delete-deliver.controller";
import { NestDeliverUseCaseModule } from "../use-case/nest-deliver-use-case.module";
import { AssignDeliverController } from "@/infra/http/controller/deliver/assign-deliver.controller";

@Module({
    imports: [NestDeliverUseCaseModule],
    controllers: [
        CreateDeliverAccountController,
        DeleteDeliverDeliverController,
        AssignDeliverController
    ],
})
export class HttpDeliverModule { }