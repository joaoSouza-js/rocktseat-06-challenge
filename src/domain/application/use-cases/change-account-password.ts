import type { AccountRepository } from "../repositories/account-repository.js";
import { HasherGenerator } from "../services/hasher-generator.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { ensureExists } from "@/core/guards/ensure-exist.js";
import { AdministratorPolicy } from "../policies/admin/administrator-policy.js";

interface Repositories {
    accountRepository: AccountRepository;
}
interface Services {
    hasherGenerator: HasherGenerator;
}
interface ChangeAccountPasswordAccountUseCaseDeps {
    repositories: Repositories;
    services: Services;
}

interface ChangeAccountPasswordUseCaseInput {
    actorId: string;
    accountId: string;
    password: string;
}


export class ChangeAccountPasswordUseCase {
    private accountRepository: AccountRepository;
    private hasherGenerator: HasherGenerator;


    constructor(deps: ChangeAccountPasswordAccountUseCaseDeps) {
        this.accountRepository = deps.repositories.accountRepository;
        this.hasherGenerator = deps.services.hasherGenerator;
    }

    async execute(
        input: ChangeAccountPasswordUseCaseInput,
    ) {
        const actorId = UniqueEntityId.rehydrate(input.actorId);
        const actorAccount = await this.accountRepository.findById(
            actorId
        )
        ensureExists(actorAccount, "Account");
        AdministratorPolicy.assertCanUpdate(actorAccount);

        const accountId = UniqueEntityId.rehydrate(input.accountId);
        const account = await this.accountRepository.findById(accountId);
        ensureExists(account, "Account");

        const passwordHash = this.hasherGenerator.generate(input.password);

        account.passwordHashed = passwordHash

        await this.accountRepository.update(account);


    }
}
