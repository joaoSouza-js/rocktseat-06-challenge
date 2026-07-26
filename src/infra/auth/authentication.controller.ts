import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { IsString } from "class-validator";
import { NestAuthenticationUseCase } from "../http/use-case/nest-authentication.use-case";
import { AccountPresenter } from "../http/presenter/account.presenter";

class CreateAccountControllerBody {

    @IsString()
    cpf!: string

    @IsString()
    password!: string
}


@Controller("/authentication")
export class AuthenticationController {

    constructor(readonly UseCase: NestAuthenticationUseCase) { }

    @Post()
    @HttpCode(200)
    async handler(@Body() body: CreateAccountControllerBody) {
        const response = await this.UseCase.execute({
            cpf: body.cpf,
            password: body.password
        })

        const account = AccountPresenter.toHttp(response.account)

        return {
            account,
            token: response.token,
            refresh_token: response.refresh_token
        }
    }
}