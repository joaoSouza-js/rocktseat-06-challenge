import { faker } from "@faker-js/faker";
import fakerBr from "faker-br";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permisions-preset.js";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";
import {
    Account,
    type AccountProps,
} from "@/domain/enterprise/entities/account-entity.js";

interface makeAccountProps extends Partial<AccountProps> { }

export function makeAccount(props: makeAccountProps): Account {
    const cpf = CPFValueObject.rehydrate(fakerBr.br.cpf());
    const name = faker.person.fullName();
    const password = faker.internet.password();
    const permissions = props.permissions ?? PermissionPresets.user;

    const account = Account.create({
        cpf: props.cpf ?? cpf,
        name: props.name ?? name,
        passwordHash: props.passwordHash ?? password,
        permissions,
    });

    return account;
}
