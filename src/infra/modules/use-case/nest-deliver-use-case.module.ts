import { NestCreateDeliverUseCase } from "@/infra/http/use-case/deliver/nest-create-deliver.use-case";
import { NestDeleteDeliverUseCase } from "@/infra/http/use-case/deliver/nest-delete-deliver.use-case";
import { Module } from "@nestjs/common";
import { DataBaseModule } from "../data-base.module";
import { NestAssignDeliverUseCase } from "@/infra/http/use-case/deliver/nest-assinger-deliver.use-case";

@Module({
    imports: [DataBaseModule],
    providers: [
        NestCreateDeliverUseCase,
        NestDeleteDeliverUseCase,
        NestAssignDeliverUseCase,
    ],
    exports: [
        NestCreateDeliverUseCase,
        NestDeleteDeliverUseCase,
        NestAssignDeliverUseCase,
    ],
})
export class NestDeliverUseCaseModule { }
