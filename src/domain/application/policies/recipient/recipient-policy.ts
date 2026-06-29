import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";

export class RecipientPolicy {
    static assertCanCreate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.RECIPIENT_CREATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.RECIPIENT_CREATE)
        }
    }

    static assertCanUpdate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.RECIPIENT_UPDATE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.RECIPIENT_UPDATE)
        }
    }

    static assertCanDelete(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.RECIPIENT_DELETE);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.RECIPIENT_DELETE)
        }
    }

    static assertCanView(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.RECIPIENT_VIEW);
        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.RECIPIENT_VIEW)
        }
    }
}