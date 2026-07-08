import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Account } from "@/domain/enterprise/entities/account/account-entity";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone";
import { AccountModel } from "@/generated/prisma/models";
export class PrismaAccountMapper {
    static toDomain(account: AccountModel): Account {
        const id = UniqueEntityId.rehydrate(account.id);
        const cpf = CPFValueObject.rehydrate(account.cpf);
        const phone = PhoneValueObject.rehydrate(account.phone);
        const accountDomain = Account.rehydrate({
            cpf,
            name: account.name,
            passwordHash: account.passwordHash,
            permissions: account.permissions as PermissionType[],
            phone: phone,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt
        }, id)

        return accountDomain
    }

    static toPrisma(account: Account): AccountModel {
        const prismaAccount: AccountModel = {
            cpf: account.cpf.cpf,
            name: account.name,
            passwordHash: account.passwordHashed,
            permissions: account.permissions,
            phone: account.phone,
            id: account.id.toString(),
            createdAt: account.createdAt,
            updatedAt: account.updatedAt

        }
        return prismaAccount
    }
}