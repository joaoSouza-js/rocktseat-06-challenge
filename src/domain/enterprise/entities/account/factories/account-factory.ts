import { Account, type CreateAccountInput } from "../account-entity.js";
import { PermissionPresets } from "../presets/permisions-preset.js";

export const AccountFactory = {
    createAdmin(input: CreateAccountInput): Account {
        return Account.create({
            ...input,
            permissions: PermissionPresets.admin,
        });
    },

    createUser(input: CreateAccountInput): Account {
        return Account.create({
            ...input,
            permissions: PermissionPresets.user,
        });
    },

    createDeliverer(input: CreateAccountInput): Account {
        return Account.create({
            ...input,
            permissions: PermissionPresets.deliverer,
        });
    },
};
