import { Entity } from "@/core/entity.js";
import type { RoleValueObject } from "./value-objects/account-role.js";
import type { CPFValueObject } from "./value-objects/cpf/cpf-value-object.js";

export interface AccountProps {
    name: string;
    cpf: CPFValueObject;
    passwordHash: string;
    role: RoleValueObject;
}
interface CreateAccountInput {
    name: string;
    cpf: CPFValueObject;
    passwordHash: string;
    role: RoleValueObject;
}

export class Account extends Entity<AccountProps> {
    static create(input: CreateAccountInput): Account {
        const account = new Account({
            cpf: input.cpf,
            name: input.name,
            passwordHash: input.passwordHash,
            role: input.role,
        });
        return account;
    }

    static rehydrate(input: AccountProps): Account {
        const account = new Account(input);
        return account;
    }

    get name(): string {
        return this.props.name;
    }

    get cpf(): CPFValueObject {
        return this.props.cpf;
    }

    get passwordHashed(): string {
        return this.props.passwordHash
    }
}
