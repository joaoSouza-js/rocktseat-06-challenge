import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { IsString } from "class-validator";
import { NestCreateAccountUseCase } from "../../use-case/nest-create-account.use-case";

class CreateAccountControllerBody {
    @IsString()
    name!: string

    @IsString()
    cpf!: string

    @IsString()
    phone!: string

    @IsString()
    password!: string
}


@Controller("/accounts")
export class CreateAccountController {

    constructor(readonly UseCase: NestCreateAccountUseCase) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() body: CreateAccountControllerBody) {
        await this.UseCase.execute({
            name: body.name,
            cpf: body.cpf,
            phone: body.phone,
            password: body.password
        })
    }
}