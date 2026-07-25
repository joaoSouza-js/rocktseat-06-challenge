import { faker } from "@faker-js/faker";
import fakerBr from "faker-br";
import {
    Account,
    type AccountProps,
} from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";
import { fakeBRPhone } from "./fake-phone.js";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/services/prisma.service.js";
import { PrismaAccountMapper } from "@/infra/database/mappers/prisma-account-mapper.js";

interface makeAccountProps extends Partial<AccountProps> { }

export function makeAccount(props?: makeAccountProps): Account {
    const cpf = CPFValueObject.rehydrate(fakerBr.br.cpf());
    const name = faker.person.fullName();
    const password = faker.internet.password();
    const permissions = props?.permissions ?? PermissionPresets.admin;
    const phone = props?.phone ?? PhoneValueObject.create(fakeBRPhone());
    const account = Account.create({
        cpf: props?.cpf ?? cpf,
        name: props?.name ?? name,
        passwordHash: props?.passwordHash ?? password,
        permissions,
        phone: phone,
    });

    return account;
}

@Injectable()
export class AccountFactory {
    constructor(readonly prismaService: PrismaService) { }

    async makePrisma(props?: makeAccountProps): Promise<Account> {
        const account = makeAccount(props);
        const accountToPersist = PrismaAccountMapper.toPrisma(account);
        await this.prismaService.account.create({ data: accountToPersist });
        return account
    }
}
