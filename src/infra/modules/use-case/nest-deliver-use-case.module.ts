import { NestCreateDeliverUseCase } from "@/infra/http/use-case/deliver/nest-create-deliver.use-case";
import { NestDeleteDeliverUseCase } from "@/infra/http/use-case/deliver/nest-delete-deliver.use-case";
import { Module } from "@nestjs/common";
import { DataBaseModule } from "../data-base.module";
import { NestAssignDeliverUseCase } from "@/infra/http/use-case/deliver/nest-assinger-deliver.use-case";
import { NestMarkDeliverDeliveredUseCase } from "@/infra/http/use-case/deliver/nest-mark-deliver-delivered.use-case";

@Module({
    imports: [DataBaseModule],
    providers: [
        NestCreateDeliverUseCase,
        NestDeleteDeliverUseCase,
        NestAssignDeliverUseCase,
        NestMarkDeliverDeliveredUseCase
    ],
    exports: [
        NestCreateDeliverUseCase,
        NestDeleteDeliverUseCase,
        NestAssignDeliverUseCase,
        NestMarkDeliverDeliveredUseCase
    ],
})
export class NestDeliverUseCaseModule { }
