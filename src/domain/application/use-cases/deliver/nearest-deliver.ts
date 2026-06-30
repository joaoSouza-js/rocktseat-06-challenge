import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location.js";
import { DelivererAccountService } from "../../services/deliverer-account.js";
import { DeliverPolicy } from "../../policies/deliver/deliver-policy.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface NearestDeliverUseCaseInput {
    latitude: number;
    longitude: number;
    actorId: string
}

export interface NearestDeliverUseCaseResponse {
    delivers: Deliver[];
}
export class NearestDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository
    private delivererAccountService: DelivererAccountService

    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountRepository = deps.repositories.accountRepository
        this.delivererAccountService = new DelivererAccountService(this.delivererRepository, this.accountRepository)

    }

    async execute(
        input: NearestDeliverUseCaseInput,
    ): Promise<NearestDeliverUseCaseResponse> {
        const delivererId = UniqueEntityId.rehydrate(input.actorId);
        const account = await this.delivererAccountService.fromDelivererId(delivererId);

        DeliverPolicy.assertCanView(account)

        const location = LocationValueObject.create({
            latitude: input.latitude,
            longitude: input.longitude
        })

        const delivers = await this.deliverRepository.fetchNearestDeliver(location, delivererId)
        return {
            delivers: delivers
        };
    }
}
