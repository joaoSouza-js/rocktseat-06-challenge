import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { NestFetchDeliverByRecipientUseCase } from "../../use-case/deliver/nest-fetch-deliver-by-recipient.use-case";
import { DeliverPresenter } from "../../presenter/deliver.presenter copy";

class FetchDeliverByRecipientControllerParams {
    @IsString()
    id!: string;


}

@Controller("deliveries/recipient/:id")
export class FetchDeliverByRecipientController {
    constructor(readonly useCase: NestFetchDeliverByRecipientUseCase) { }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get()
    async handle(
        @CurrentUser() user: CurrentUserPayload,
        @Param() params: FetchDeliverByRecipientControllerParams,
    ) {
        const response = await this.useCase.execute({ actorId: user.sub, recipientId: params.id });

        const presenter = response.delivers.map((deliver) => DeliverPresenter.toHttp(deliver));

        return { delivers: presenter };
    }
}
