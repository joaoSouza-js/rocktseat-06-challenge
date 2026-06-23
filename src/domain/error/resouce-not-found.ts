import { ApplicationError } from "./application-error.js";

export class ResourceNotFound extends ApplicationError {
    constructor(resource: string) {
        super(`resource ${resource} already exist please provide a new one`)
        this.name = this.constructor.name
    }
} 