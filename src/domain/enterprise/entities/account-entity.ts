import { Entity } from "@/core/entity.js";
import type { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import type { CPFValueObject } from "./account/value-objects/cpf/cpf-value-object.js";

export interface AccountProps {
    name: string;
    cpf: CPFValueObject;
    passwordHash: string;
    permissions: PermissionType[];
}

export interface CreateAccountInput {
    name: string;
    cpf: CPFValueObject;
    passwordHash: string;
    permissions?: PermissionType[];
}

export class Account extends Entity<AccountProps> {
    static create(input: CreateAccountInput): Account {
        return new Account({
            cpf: input.cpf,
            name: input.name,
            passwordHash: input.passwordHash,
            permissions: input.permissions ?? [],
        });
    }

    static rehydrate(input: AccountProps): Account {
        return new Account(input);
    }

    hasPermission(permission: PermissionType): boolean {
        return this.props.permissions.includes(permission);
    }

    grantPermission(permission: PermissionType): void {
        if (!this.hasPermission(permission)) {
            this.props.permissions.push(permission);
        }
    }

    revokePermission(permission: PermissionType): void {
        this.props.permissions = this.props.permissions.filter(
            (p) => p !== permission,
        );
    }

    get permissions(): PermissionType[] {
        return [...this.props.permissions];
    }

    get name(): string {
        return this.props.name;
    }

    get cpf(): CPFValueObject {
        return this.props.cpf;
    }

    get passwordHashed(): string {
        return this.props.passwordHash;
    }
}
