import { Controller, Delete, HttpCode, Param, UseGuards } from "@nestjs/common";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { NestDeleteDeliverUseCase } from "../../use-case/deliver/nest-delete-deliver.use-case";

class DeleteDeliverDeliverControllerParams {
    @IsString()
    id!: string



}

@Controller()
export class DeleteDeliverDeliverController {
    constructor(readonly useCase: NestDeleteDeliverUseCase) { }

    @Delete('/deliver/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async handler(@CurrentUser() user: CurrentUserPayload, @Param() params: DeleteDeliverDeliverControllerParams,) {

        await this.useCase.execute({
            actorId: user.sub,
            deliverId: params.id

        })


    }
}