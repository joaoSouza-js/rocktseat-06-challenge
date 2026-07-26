import { PermissionType } from "../enterprise/entities/account/enums/permissions-type.js";
import { ApplicationError } from "./application-error.js";

export class MissingPermissionError extends ApplicationError {
    constructor(permission: PermissionType | PermissionType[]) {
        const permissions = Array.isArray(permission)
            ? permission.join(", ")
            : permission;

        super(`Missing required permission(s): ${permissions}.`);
        this.name = this.constructor.name;
    }
}