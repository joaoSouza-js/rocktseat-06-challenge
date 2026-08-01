import { CurrentUser } from "@/infra/auth/current-user.decorator";
import type { CurrentUserPayload } from "@/infra/auth/types/current-user";
import { Controller, HttpCode, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { IsString } from "class-validator";
import { JwtAuthGuard } from "@/infra/auth/guard/jwt-auth.guard";
import { NestMarkDeliverDeliveredUseCase } from "../../use-case/deliver/nest-mark-deliver-delivered.use-case";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageValidationPipe } from "@/infra/pipe/file.validation.pipe";

class AssignDeliverControllerParams {
    @IsString()
    id!: string;
}

@Controller("deliver/:id/delivered")
export class MarkDeliverDeliveredUseCaseController {
    constructor(readonly useCase: NestMarkDeliverDeliveredUseCase) { }

    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Patch()
    @UseInterceptors(FileInterceptor('file'))
    async handle(
        @CurrentUser() user: CurrentUserPayload,
        @Param() params: AssignDeliverControllerParams,
        @UploadedFile(new ImageValidationPipe()) _: Express.Multer.File
    ) {
        await this.useCase.execute({ actorId: user.sub, deliverId: params.id });
    }
}




