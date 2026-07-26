import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { IsNumber, IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { NestCreateDeliverUseCase } from "../../use-case/deliver/nest-create-deliver.use-case";
import { DeliverPresenter } from "../../presenter/deliver.presenter copy";
import { Transform } from "class-transformer";


class CreateDeliverAccountControllerBody {
    @IsString()
    name!: string

    @IsString()
    phone!: string

    @IsString()
    recipientId!: string;

    @IsString()
    address!: string;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    latitude!: number;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    longitude!: number;


}

@Controller()
export class CreateDeliverAccountController {
    constructor(readonly useCase: NestCreateDeliverUseCase) { }

    @Post('/deliver')
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    async handler(@CurrentUser() user: CurrentUserPayload, @Body() body: CreateDeliverAccountControllerBody,) {

        const response = await this.useCase.execute({
            actorId: user.sub,
            address: body.address,
            latitude: body.latitude,
            longitude: body.longitude,
            recipientId: body.recipientId

        })

        const presenter = DeliverPresenter.toHttp(response.deliver)

        return {
            deliver: presenter
        }
    }
}