import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { NestCreateDelivererUseCase } from "../use-case/deliverer/nest-create-deliverer.use-case";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";



class CreateDelivererAccountControllerBody {
    @IsString()
    name!: string

    @IsString()
    cpf!: string

    @IsString()
    phone!: string

    @IsString()
    password!: string
}

@Controller()
export class CreateDelivererAccountController {
    constructor(readonly useCase: NestCreateDelivererUseCase) { }

    @Post('/deliverer')
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    async handler(@CurrentUser() user: CurrentUserPayload, @Body() body: CreateDelivererAccountControllerBody,) {

        await this.useCase.execute({
            actorId: user.sub,
            cpf: body.cpf,
            name: body.name,
            phone: body.phone,
            password: body.password
        })

        return {
            user,
            body
        }
    }
}