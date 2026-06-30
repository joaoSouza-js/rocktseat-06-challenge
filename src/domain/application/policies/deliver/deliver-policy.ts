import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";

export class DeliverPolicy {
    static assertCanCreate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVER_CREATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVER_CREATE)
        }
    }

    static assertCanUpdate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVER_UPDATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVER_UPDATE)
        }
    }

    static assertCanDelete(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVER_DELETE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVER_DELETE)
        }
    }

    static assertCanView(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.DELIVER_VIEW);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVER_VIEW)
        }
    }
}