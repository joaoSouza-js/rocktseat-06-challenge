import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { Controller, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { NestAssignDeliverUseCase } from "../../use-case/deliver/nest-assinger-deliver.use-case";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";

class AssignDeliverControllerParams {
    @IsString()
    id!: string;
}

@Controller("deliver/:id/assign")
export class AssignDeliverController {
    constructor(readonly useCase: NestAssignDeliverUseCase) { }

    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Patch()
    async handle(
        @CurrentUser() user: CurrentUserPayload,
        @Param() params: AssignDeliverControllerParams,
    ) {
        await this.useCase.execute({ actorId: user.sub, deliverId: params.id });
    }
}
