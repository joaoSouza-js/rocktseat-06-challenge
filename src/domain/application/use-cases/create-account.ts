import { Account } from "@/domain/enterprise/entities/account.js";
import { RoleValueObject } from "@/domain/enterprise/entities/value-objects/account-role.js";
import { CPFValueObject } from "@/domain/enterprise/entities/value-objects/cpf/cpf-value-object.js";
import { ResourceAlreadyExist } from "@/domain/error/resource-already-exist.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "../services/hasher-generator.js";

interface Repositories {
    accountRepository: AccountRepository;
}
interface Services {
    hasherGenerator: HasherGenerator;
}
interface AccountUseCaseDeps {
    repositories: Repositories;
    services: Services;
}

export interface CreateAccountUseCaseInput {
    cpf: string;
    role: string;
    password: string;
    name: string;
}

export class CreateAccountUseCase {
    private accountRepository: AccountRepository;
    private hasherGenerator: HasherGenerator;

    constructor(deps: AccountUseCaseDeps) {
        this.accountRepository = deps.repositories.accountRepository;
        this.hasherGenerator = deps.services.hasherGenerator;
    }

    async execute(input: CreateAccountUseCaseInput): Promise<Account> {
        const passwordHashed = this.hasherGenerator.generate(input.password);
        const cpf = CPFValueObject.create(input.cpf);
        const role = RoleValueObject.create(input.role);

        const accountAlreadyExist = await this.accountRepository.findByCpf(cpf);

        if (accountAlreadyExist) {
            throw new ResourceAlreadyExist(input.cpf);
        }

        const account = Account.create({
            cpf: cpf,
            name: input.name,
            passwordHash: passwordHashed,
            role: role,
        });

        await this.accountRepository.create(account);

        return account;
    }
}
