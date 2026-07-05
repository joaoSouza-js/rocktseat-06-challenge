import type { RecipientRepository } from "../../repositories/recipient-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { ensureExists } from "@/domain/core/guards/ensure-exist.js";
import { RecipientPolicy } from "../../policies/recipient/recipient-policy.js";

interface Repositories {
    recipientRepository: RecipientRepository;
    accountRepository: AccountRepository;

}

interface AccountUseCaseDeps {
    repositories: Repositories;
}

export interface DeleteRecipientUseCaseInput {
    actorId: string
    recipientId: string
}


export class DeleteRecipientUseCase {
    private recipientRepository: RecipientRepository;
    private accountRepository: AccountRepository;

    constructor(deps: AccountUseCaseDeps) {
        this.recipientRepository = deps.repositories.recipientRepository;
        this.accountRepository = deps.repositories.accountRepository;

    }

    async execute(
        input: DeleteRecipientUseCaseInput,
    ) {

        const actorId = UniqueEntityId.rehydrate(input.actorId);

        const actorAccount = await this.accountRepository.findById(actorId);
        ensureExists(actorAccount, "Account");
        RecipientPolicy.assertCanDelete(actorAccount);

        const recipientId = UniqueEntityId.rehydrate(input.recipientId);
        const recipient = await this.recipientRepository.findById(recipientId);
        ensureExists(recipient, "Recipient");

        await this.recipientRepository.delete(recipientId);

    }
}
