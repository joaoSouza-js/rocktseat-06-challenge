import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { DeliverPolicy } from "../../policies/deliver/deliver-policy.js";
import { DelivererAccountService } from "../../services/deliverer-account.js";
import { DelivererRepository } from "../../repositories/deliverer-repository.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    accountRepository: AccountRepository;
    delivererRepository: DelivererRepository;
}

interface FetchDelivererDeliverUseCaseDeps {
    repositories: Repositories;
}

export interface FetchDelivererDeliverUseCaseInput {
    actorId: string
}


export class FetchDelivererDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private accountRepository: AccountRepository;
    private delivererRepository: DelivererRepository;

    private delivererAccountService: DelivererAccountService

    constructor(deps: FetchDelivererDeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.accountRepository = deps.repositories.accountRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.delivererAccountService = new DelivererAccountService(
            this.delivererRepository, this.accountRepository
        );
    }

    async execute(
        input: FetchDelivererDeliverUseCaseInput,
    ) {

        const actorId = UniqueEntityId.rehydrate(input.actorId);
        const account = await this.delivererAccountService.fromDelivererId(actorId);

        DeliverPolicy.assertCanView(account);

        const delivers = await this.deliverRepository.fetchByDelivererId(actorId);

        return { delivers };

    }
}
