import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";

export class AdministratorCreationPolicy {
    static assertCanCreate(account: Account) {
        const hasPermission = account.hasPermission(PermissionType.ADMIN_CREATE);
        if (hasPermission === false) {
            throw new CredentialsInvalid()
        }
    }
}