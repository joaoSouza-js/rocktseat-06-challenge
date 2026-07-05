import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { ensureExists } from "@/domain/core/guards/ensure-exist.js";
import { DeliverPolicy } from "../../policies/deliver/deliver-policy.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    accountRepository: AccountRepository;

}

interface AccountUseCaseDeps {
    repositories: Repositories;
}

export interface DeleteDeliverUseCaseInput {
    actorId: string
    deliverId: string
}


export class DeleteDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private accountRepository: AccountRepository;

    constructor(deps: AccountUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.accountRepository = deps.repositories.accountRepository;

    }

    async execute(
        input: DeleteDeliverUseCaseInput,
    ) {

        const actorId = UniqueEntityId.rehydrate(input.actorId);

        const actorAccount = await this.accountRepository.findById(actorId);
        ensureExists(actorAccount, "Account");
        DeliverPolicy.assertCanDelete(actorAccount);

        const deliverId = UniqueEntityId.rehydrate(input.deliverId);
        const deliver = await this.deliverRepository.findById(deliverId);
        ensureExists(deliver, "Deliver");

        await this.deliverRepository.delete(deliverId);

    }
}
