import { ApplicationError } from "./application-error.js";

export class ValidationError extends ApplicationError {
    constructor(expectation: string) {
        super(expectation)
        this.name = this.constructor.name
    }
} 