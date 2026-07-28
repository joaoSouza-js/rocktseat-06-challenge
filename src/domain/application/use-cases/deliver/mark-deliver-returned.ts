import { ensureExists } from "@/domain/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverUpdatePolicy } from "../../policies/deliver/deliver-update-policy.js";
import { DelivererAccountLoaderContext } from "../../services/deliverer-account-loader-context.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository;
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface MarkDeliverReturnedUseCaseInput {
    actorId: string;
    deliverId: string;
}

export interface MarkDeliverReturnedUseCaseResponse {
    deliver: Deliver;
}

export class MarkDeliverReturnedUseCase {
    private deliverRepository: DeliverRepository;
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository;
    private delivererAccountLoaderContext: DelivererAccountLoaderContext;

    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountRepository = deps.repositories.accountRepository;

        this.delivererAccountLoaderContext = new DelivererAccountLoaderContext(
            this.delivererRepository,
            this.accountRepository,
        );
    }

    async execute(
        input: MarkDeliverReturnedUseCaseInput,
    ): Promise<MarkDeliverReturnedUseCaseResponse> {
        const accountId = UniqueEntityId.rehydrate(input.actorId);
        const deliverId = UniqueEntityId.rehydrate(input.deliverId);

        const deliver = await this.deliverRepository.findById(deliverId);
        ensureExists(deliver, "Deliver");

        const { account, deliverer } =
            await this.delivererAccountLoaderContext.fromAccountId(accountId);

        DeliverUpdatePolicy.assertCanUpdate({
            account,
            delivererId: deliverer.id,
            deliver,
        });

        deliver.deliverReturned();
        deliver.unassignDeliverer()


        await this.deliverRepository.update(deliver);

        return {
            deliver,
        };
    }
}