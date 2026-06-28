import { ApplicationError } from "./application-error.js";

export class ResourceNotFound extends ApplicationError {
    constructor(resource: string, data?: string) {
        super(`resource ${resource} was deleted or not exist`)
        this.name = this.constructor.name
    }
} 