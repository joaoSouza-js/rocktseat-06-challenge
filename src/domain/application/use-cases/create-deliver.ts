import { ensureExists } from "@/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import type { DeliverRepository } from "../repositories/deliver-repository.js";
import type { DelivererRepository } from "../repositories/deliverer-repository.js";
import type { RecipientRepository } from "../repositories/recipent-repository.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    recipientRepository: RecipientRepository;
    delivererRepository: DelivererRepository;
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface CreateDeliverUseCaseInput {
    delivererId: string;
    recipientId: string;
    address: string;
}
export interface CreateDeliverUseCaseResponse {
    deliver: Deliver;
}
export class CreateDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private recipientRepository: RecipientRepository;
    private delivererRepository: DelivererRepository;

    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.recipientRepository = deps.repositories.recipientRepository;
    }

    async execute(
        input: CreateDeliverUseCaseInput,
    ): Promise<CreateDeliverUseCaseResponse> {
        const delivererId = UniqueEntityId.rehydrate(input.delivererId);
        const recipientId = UniqueEntityId.rehydrate(input.recipientId);

        const recipient =
            await this.recipientRepository.findById(recipientId);
        const deliverer =
            await this.delivererRepository.findById(delivererId);

        ensureExists(recipient, "Recipient");
        ensureExists(deliverer, "Deliverer");



        const deliver = Deliver.create({
            address: input.address,
            delivererId: delivererId,
            recipientId: recipientId,
        });

        await this.deliverRepository.create(deliver);

        return {
            deliver,
        };
    }
}
