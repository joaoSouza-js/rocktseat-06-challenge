import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { ensureExists } from "@/core/guards/ensure-exist.js";
import { DelivererPolicy } from "../../policies/deliverer/deliverer-policy.js";

interface Repositories {
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository;

}

interface AccountUseCaseDeps {
    repositories: Repositories;
}

export interface DeleteDelivererUseCaseInput {
    actorId: string
    delivererId: string
}


export class DeleteDelivererUseCase {
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository;

    constructor(deps: AccountUseCaseDeps) {
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountRepository = deps.repositories.accountRepository;

    }

    async execute(
        input: DeleteDelivererUseCaseInput,
    ) {

        const actorId = UniqueEntityId.rehydrate(input.actorId);

        const actorAccount = await this.accountRepository.findById(actorId);
        ensureExists(actorAccount, "Account");
        DelivererPolicy.assertCanDelete(actorAccount);

        const delivererId = UniqueEntityId.rehydrate(input.delivererId);
        const deliverer = await this.delivererRepository.findById(delivererId);
        ensureExists(deliverer, "Deliverer");

        await this.delivererRepository.delete(delivererId);

    }
}
