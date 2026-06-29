import { ensureExists } from "@/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver, DeliverStatus } from "@/domain/enterprise/entities/deliver.js";
import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverUpdatePolicy } from "../../policies/deliver/deliver-update-policy.js";
import { DelivererAccountService } from "../../services/deliverer-account.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface MarkDeliverReturnedUseCaseInput {
    delivererId: string;
    deliverId: string;
}
export interface MarkDeliverReturnedUseCaseResponse {
    deliver: Deliver;
}
export class MarkDeliverReturnedUseCase {
    private deliverRepository: DeliverRepository;
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository
    private delivererAccountService: DelivererAccountService


    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountRepository = deps.repositories.accountRepository
        this.delivererAccountService = new DelivererAccountService(
            this.delivererRepository, this.accountRepository
        );

    }

    async execute(
        input: MarkDeliverReturnedUseCaseInput,
    ): Promise<MarkDeliverReturnedUseCaseResponse> {
        const delivererId = UniqueEntityId.rehydrate(input.delivererId);
        const deliverId = UniqueEntityId.rehydrate(input.deliverId);

        const account = await this.delivererAccountService.fromDelivererId(delivererId);
        const deliver = await this.deliverRepository.findById(deliverId);
        ensureExists(deliver, "Deliver");

        DeliverUpdatePolicy.assertCanUpdate({ account, delivererId, deliver });

        deliver.changeStatus(DeliverStatus.RETURNED)

        await this.deliverRepository.update(deliver);

        return {
            deliver
        }


    }
}
