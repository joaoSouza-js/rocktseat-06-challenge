import { ApplicationError } from "@/domain/error/application-error";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid";
import { MissingPermissionError } from "@/domain/error/missing-permission-error";
import { ResourceAlreadyExist } from "@/domain/error/resource-already-exist";
import { ValidationError } from "@/domain/error/validation-error";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";


type ErrorMapping<T extends ApplicationError = ApplicationError> = {
    match: new (...args: any[]) => T;
    handler: (error: T) => Error;
};

const errorMappings: ErrorMapping[] = [
    {
        match: CredentialsInvalid,
        handler: (err) => new UnauthorizedException(err.message),
    },
    {
        match: MissingPermissionError,
        handler: (err) => new UnauthorizedException(err.message),
    },
    {
        match: ValidationError,
        handler: (err) => new BadRequestException(err.message),
    },
    {
        match: ResourceAlreadyExist,
        handler: (err) => new BadRequestException(err.message),
    }
];

export function mapApplicationError(exception: ApplicationError): Error {
    for (const { match, handler } of errorMappings) {
        if (exception instanceof match) {
            return handler(exception);
        }
    }

    return new BadRequestException(exception.message);
}
