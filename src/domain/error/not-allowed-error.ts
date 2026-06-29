import { ApplicationError } from "./application-error.js";

export class NotAllowedError extends ApplicationError {
    constructor() {
        super("you not allowed to do this action")
        this.name = this.constructor.name
    }
} 