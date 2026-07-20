
import { Catch, ExceptionFilter } from "@nestjs/common";
import { ApplicationError } from "@/domain/error/application-error";
import { mapApplicationError } from "../http/mappers/application-error.mapper";




@Catch(ApplicationError)
export class UseCaseExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationError) {
        const error = mapApplicationError(exception)
        throw error
    }
}