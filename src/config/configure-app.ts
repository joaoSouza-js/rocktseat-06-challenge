import { PrismaExceptionFilter } from "@/infra/filters/prisma-exception-filter"
import { UseCaseExceptionFilter } from "@/infra/filters/use-case-exception-filter"
import { INestApplication, ValidationPipe } from "@nestjs/common"

// app.config.ts
export function configureApp(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
    }))
    app.useGlobalFilters(new UseCaseExceptionFilter(), new PrismaExceptionFilter())

    // ...
}