import { AccountRepository } from "@/domain/application/repositories/account-repository";
import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Account } from "@/domain/enterprise/entities/account/account-entity";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object";
import { PrismaService } from "@/infra/services/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaAccountMapper } from "../mappers/prisma-account-mapper";

@Injectable()
export class PrismaAccountRepository implements AccountRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(account: Account): Promise<void> {
        const persistAccount = PrismaAccountMapper.toPrisma(account)
        await this.prismaService.account.create({ data: persistAccount })
    }
    async findById(id: UniqueEntityId): Promise<Account | null> {
        const accountFound = await this.prismaService.account.findUnique({ where: { id: id.toString() } });
        const account = accountFound ? PrismaAccountMapper.toDomain(accountFound) : null;
        return account
    }
    async findByCpf(cpf: CPFValueObject): Promise<Account | null> {
        const accountFound = await this.prismaService.account.findUnique({ where: { cpf: cpf.cpf } });
        const account = accountFound ? PrismaAccountMapper.toDomain(accountFound) : null;
        return account
    }
    async update(account: Account): Promise<void> {
        const persistAccount = PrismaAccountMapper.toPrisma(account)
        await this.prismaService.account.update({
            where: { id: account.id.toString() },
            data: persistAccount
        })
    }

}