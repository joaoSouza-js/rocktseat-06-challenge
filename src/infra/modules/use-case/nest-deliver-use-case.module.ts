import { NestCreateDeliverUseCase } from "@/infra/http/use-case/deliver/nest-create-deliver.use-case";
import { NestDeleteDeliverUseCase } from "@/infra/http/use-case/deliver/nest-delete-deliver.use-case";
import { Module } from "@nestjs/common";
import { DataBaseModule } from "../data-base.module";

@Module({
    imports: [DataBaseModule],
    providers: [NestCreateDeliverUseCase, NestDeleteDeliverUseCase],
    exports: [NestCreateDeliverUseCase, NestDeleteDeliverUseCase],
})
export class NestDeliverUseCaseModule { }
