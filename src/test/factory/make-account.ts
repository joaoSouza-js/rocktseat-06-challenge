import { faker } from "@faker-js/faker";
import fakerBr from "faker-br";
import { Account, type AccountProps } from "@/domain/enterprise/entities/account.js";
import { RoleValueObject } from "@/domain/enterprise/entities/value-objects/account-role.js";
import { CPFValueObject } from "@/domain/enterprise/entities/value-objects/cpf/cpf-value-object.js";

interface makeAccountProps extends Partial<AccountProps> { }

export function makeAccount(props: makeAccountProps): Account {
    const cpf = CPFValueObject.rehydrate(fakerBr.br.cpf());
    const name = faker.person.fullName();
    const password = faker.internet.password();
    const role = RoleValueObject.create("ADMIN");

    const account = Account.create({
        cpf: props.cpf ?? cpf,
        name: props.name ?? name,
        passwordHash: props.passwordHash ?? password,
        role: props.role ?? role
    })

    return account
}
