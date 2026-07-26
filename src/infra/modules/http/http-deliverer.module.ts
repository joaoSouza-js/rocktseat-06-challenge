import { Module } from "@nestjs/common";
import { CreateDelivererAccountController } from "@/infra/http/controller/create-deliverer-account.controller";
import { DeleteDelivererAccountController } from "@/infra/http/controller/delete-deliverer-account.controller";
import { NestDelivererUseCaseModule } from "../use-case/nest-deliverer-use-case.module";

@Module({
    imports: [NestDelivererUseCaseModule],
    controllers: [
        CreateDelivererAccountController,
        DeleteDelivererAccountController,
    ],
})
export class HttpDelivererModule { }