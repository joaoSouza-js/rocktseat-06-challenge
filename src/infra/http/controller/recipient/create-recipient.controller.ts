import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { NestCreateRecipientUseCase } from "../../use-case/recipient/nest-create-recipient.use-case";
import { RecipientPresenter } from "@/infra/presenter/recipient.presenter";



class CreateDelivererAccountControllerBody {
    @IsString()
    name!: string

    @IsString()
    phone!: string


}

@Controller()
export class CreateRecipientAccountController {
    constructor(readonly useCase: NestCreateRecipientUseCase) { }

    @Post('/recipient')
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    async handler(@CurrentUser() user: CurrentUserPayload, @Body() body: CreateDelivererAccountControllerBody,) {

        const response = await this.useCase.execute({
            actorId: user.sub,
            name: body.name,
            phone: body.phone,

        })

        const presenter = RecipientPresenter.toHttp(response.recipient)

        return {
            recipient: presenter
        }
    }
}