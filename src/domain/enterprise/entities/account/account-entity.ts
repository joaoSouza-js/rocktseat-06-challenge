import { Entity } from "@/domain/core/entity.js";
import type { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import type { PhoneValueObject } from "../value-objects/phone.js";
import type { CPFValueObject } from "./value-objects/cpf/cpf-value-object.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";

export interface AccountProps {
    name: string;
    cpf: CPFValueObject;
    phone: PhoneValueObject;
    passwordHash: string;
    permissions: PermissionType[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateAccountInput {
    name: string;
    cpf: CPFValueObject;
    phone: PhoneValueObject;
    passwordHash: string;
    permissions?: PermissionType[];
}

export class Account extends Entity<AccountProps> {

    static create(input: CreateAccountInput): Account {
        return new Account({
            cpf: input.cpf,
            name: input.name,
            phone: input.phone,
            passwordHash: input.passwordHash,
            permissions: input.permissions ?? [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static rehydrate(input: AccountProps, id: UniqueEntityId): Account {
        return new Account(input, id);
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

    touch(account: Account) {
        account.props.updatedAt = new Date();
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

    get phone(): string {
        return this.props.phone.value;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    set passwordHashed(passwordHashed: string) {
        this.props.passwordHash = passwordHashed;
        this.touch(this);
    }

    set name(name: string) {
        this.props.name = name;
        this.touch(this);
    }

    set phone(phone: PhoneValueObject) {
        this.props.phone = phone;
        this.touch(this);
    }
}
