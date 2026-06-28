import { ensureExists } from "@/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver, DeliverStatus } from "@/domain/enterprise/entities/deliver.js";
import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverUpdatePolicy } from "../../policies/deliver-update-policy.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface MarkDeliveredPackageUseCaseInput {
    delivererId: string;
    deliverId: string;
}
export interface MarkDeliveredPackageUseCaseResponse {
    deliver: Deliver;
}
export class MarkDeliveredPackageUseCase {
    private deliverRepository: DeliverRepository;
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository

    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountRepository = deps.repositories.accountRepository
    }

    async execute(
        input: MarkDeliveredPackageUseCaseInput,
    ): Promise<MarkDeliveredPackageUseCaseResponse> {
        const delivererId = UniqueEntityId.rehydrate(input.delivererId);
        const deliverer = await this.delivererRepository.findById(delivererId);

        ensureExists(deliverer, "Deliverer");

        const deliverId = UniqueEntityId.rehydrate(input.deliverId);
        const accountId = deliverer.accountId

        const deliverPromise = this.deliverRepository.findById(deliverId);
        const accountPromise = this.accountRepository.findById(accountId);

        const [deliver, account] = await Promise.all([deliverPromise, accountPromise]);

        ensureExists(deliver, "Deliver");
        ensureExists(account, "Account");

        DeliverUpdatePolicy.assertCanUpdate({ account, deliverer, deliver });

        deliver.changeStatus(DeliverStatus.DELIVERED)

        await this.deliverRepository.update(deliver);

        return {
            deliver
        }

    }
}
