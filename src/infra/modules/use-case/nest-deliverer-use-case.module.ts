import { Module } from "@nestjs/common";
import { DataBaseModule } from "../data-base.module";
import { NestCreateDelivererUseCase } from "@/infra/http/use-case/nest-create-deliverer.use-case";
import { NestDeleteDelivererUseCase } from "@/infra/http/use-case/nest-delete-deliverer.use-case";
import { HasherService } from "@/infra/services/hasher.service";

@Module({
    imports: [DataBaseModule],
    providers: [
        HasherService,
        NestCreateDelivererUseCase,
        NestDeleteDelivererUseCase,
    ],
    exports: [NestCreateDelivererUseCase, NestDeleteDelivererUseCase],
})
export class NestDelivererUseCaseModule { }
