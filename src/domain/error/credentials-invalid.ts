import { ApplicationError } from "./application-error.js";

export class CredentialsInvalid extends ApplicationError {
    constructor() {
        super(`Credentials are not valid`)
        this.name = this.constructor.name
    }
} 