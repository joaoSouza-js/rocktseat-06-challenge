import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { DeliverPresenter } from "../../presenter/deliver.presenter copy";
import { NestFetchDeliverByDeliverUseCase } from "../../use-case/deliver/nest-deliver-by-deliverer.use-case";
import { IsString } from "class-validator";

class FetchDeliverByDeliverControllerParams {
    @IsString()
    id!: string;


}

@Controller("deliveries/deliverer/:id")
export class FetchDeliverByDeliverController {
    constructor(readonly useCase: NestFetchDeliverByDeliverUseCase) { }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get()
    async handle(
        @CurrentUser() user: CurrentUserPayload,
        @Param() param: FetchDeliverByDeliverControllerParams
    ) {
        const response = await this.useCase.execute({ actorId: param.id });

        const presenter = response.delivers.map((deliver) => DeliverPresenter.toHttp(deliver));

        return { delivers: presenter };
    }
}
