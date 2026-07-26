import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error";

export class AdministratorCreationPolicy {
    static assertCanCreate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.ADMIN_CREATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.ADMIN_CREATE)
        }
    }
}