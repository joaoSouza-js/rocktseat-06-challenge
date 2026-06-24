import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permisions-preset.js";
import type { Account } from "@/domain/enterprise/entities/account-entity.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import { AccountCreatorService } from "../services/account-creator.js";
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
    password: string;
    name: string;
}

export class CreateAccountUseCase {
    private accountRepository: AccountRepository;
    private hasherGenerator: HasherGenerator;
    private accountCreatorService: AccountCreatorService;

    constructor(deps: AccountUseCaseDeps) {
        this.accountRepository = deps.repositories.accountRepository;
        this.hasherGenerator = deps.services.hasherGenerator;
        this.accountCreatorService = new AccountCreatorService(
            this.accountRepository,
            this.hasherGenerator,
        );
    }

    async execute(input: CreateAccountUseCaseInput): Promise<Account> {
        const account = this.accountCreatorService.create({
            user: input,
            permissions: PermissionPresets.user,
        });
        return account;
    }
}
