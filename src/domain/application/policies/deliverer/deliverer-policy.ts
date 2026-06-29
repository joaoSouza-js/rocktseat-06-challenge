import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";

export class DelivererPolicy {
    static assertCanCreate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVERER_CREATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVERER_CREATE)
        }
    }

    static assertCanUpdate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVERER_UPDATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVERER_UPDATE)
        }
    }

    static assertCanDelete(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVERER_DELETE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVERER_DELETE)
        }
    }

    static assertCanView(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.VIEW);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.VIEW)
        }
    }
}