import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { AccountRepository } from "../../repositories/account-repository";
import { DeliverRepository } from "../../repositories/deliver-repository";
import { DelivererRepository } from "../../repositories/deliverer-repository";
import { ensureExists } from "@/domain/core/guards/ensure-exist";
import { DeliverUpdatePolicy } from "../../policies/deliver/deliver-update-policy";
import { DelivererAccountLoaderContext } from "../../services/deliverer-account-loader-context";

interface Repositories {
    deliverRepository: DeliverRepository;
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository
}

interface AssignDeliverUseCaseDeps {
    repositories: Repositories;
}

interface AssignDeliverUseCaseInput {
    actorId: string;
    deliverId: string;
}


export class AssignDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository
    private delivererAccountLoaderContext: DelivererAccountLoaderContext

    constructor(deps: AssignDeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountRepository = deps.repositories.accountRepository
        this.delivererAccountLoaderContext = new DelivererAccountLoaderContext(this.delivererRepository, this.accountRepository)
    }

    async execute(input: AssignDeliverUseCaseInput) {
        const accountId = UniqueEntityId.rehydrate(input.actorId);
        const deliverId = UniqueEntityId.rehydrate(input.deliverId);

        const deliver = await this.deliverRepository.findById(deliverId);
        ensureExists(deliver, "Deliver");

        const { account, deliverer } = await this.delivererAccountLoaderContext.fromAccountId(accountId);

        DeliverUpdatePolicy.assertCanAssignDeliverer(account, deliver);

        deliver.assignDeliverer(deliverer.id);
        deliver.deliverInProgress();

        await this.deliverRepository.update(deliver);

    }


}