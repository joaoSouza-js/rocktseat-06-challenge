import { ApplicationError } from "./application-error.js";

export class CredentialsInvalid extends ApplicationError {
    constructor() {
        super(`You don't have permission to do this action`)
        this.name = this.constructor.name
    }
} 