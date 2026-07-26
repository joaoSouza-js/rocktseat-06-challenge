import { Controller, Delete, HttpCode, Param, UseGuards } from "@nestjs/common";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { NestDeleteRecipientUseCase } from "../../use-case/recipient/nest-delete-recipient.use-case";

class DeleteDelivererAccountControllerParams {
    @IsString()
    id!: string
}

@Controller()
export class DeleteRecipientAccountController {
    constructor(readonly useCase: NestDeleteRecipientUseCase) { }

    @Delete('/recipient/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async handler(@CurrentUser() user: CurrentUserPayload, @Param() params: DeleteDelivererAccountControllerParams,) {
        await this.useCase.execute({
            actorId: user.sub,
            recipientId: params.id
        })
    }
}