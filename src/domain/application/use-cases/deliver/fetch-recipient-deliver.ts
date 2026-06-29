import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { ensureExists } from "@/core/guards/ensure-exist.js";
import { DeliverPolicy } from "../../policies/deliver/deliver-policy.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    accountRepository: AccountRepository;

}

interface FetchRecipientDeliverDeliverUseCaseDeps {
    repositories: Repositories;
}

export interface FetchRecipientDeliverDeliverUseCaseInput {
    actorId: string
    recipientId: string
}


export class FetchRecipientDeliverDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private accountRepository: AccountRepository;

    constructor(deps: FetchRecipientDeliverDeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.accountRepository = deps.repositories.accountRepository;

    }

    async execute(
        input: FetchRecipientDeliverDeliverUseCaseInput,
    ) {

        const actorId = UniqueEntityId.rehydrate(input.actorId);

        const actorAccount = await this.accountRepository.findById(actorId);
        ensureExists(actorAccount, "Account");
        DeliverPolicy.assertCanView(actorAccount);

        const recipientId = UniqueEntityId.rehydrate(input.recipientId);
        const delivers = await this.deliverRepository.fetchByRecipientId(recipientId);

        return { delivers };

    }
}
