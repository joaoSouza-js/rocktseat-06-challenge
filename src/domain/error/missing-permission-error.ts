import { PermissionType } from "../enterprise/entities/account/enums/permissions-type.js";

export class MissingPermissionError extends Error {
    constructor(permission: PermissionType | PermissionType[]) {
        const permissions = Array.isArray(permission)
            ? permission.join(", ")
            : permission;

        super(`Missing required permission(s): ${permissions}.`);
        this.name = this.constructor.name;
    }
}