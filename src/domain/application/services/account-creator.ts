import type { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";
import { Account } from "@/domain/enterprise/entities/account-entity.js";
import { ResourceAlreadyExist } from "@/domain/error/resource-already-exist.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "./hasher-generator.js";


export interface AccountCreatorServiceRequest {
    user: {
        cpf: string;
        password: string;
        name: string;
    }
    permissions: PermissionType[];
}

export class AccountCreatorService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly hasherGenerator: HasherGenerator,
    ) { }

    async create(input: AccountCreatorServiceRequest): Promise<Account> {
        const { permissions, user } = input
        const passwordHashed = this.hasherGenerator.generate(user.password);

        const cpf = CPFValueObject.create(user.cpf);

        const accountAlreadyExist = await this.accountRepository.findByCpf(cpf);

        if (accountAlreadyExist) {
            throw new ResourceAlreadyExist(user.cpf);
        }

        const account = Account.create({
            cpf,
            name: user.name,
            passwordHash: passwordHashed,
            permissions: permissions,
        });

        await this.accountRepository.create(account);

        return account;
    }
}
