import { faker } from "@faker-js/faker";
import fakerBr from "faker-br";
import {
    Account,
    type AccountProps,
} from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";

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
        phone: PhoneValueObject.create("+5511987654321")
    });

    return account;
}
