import { ensureExists } from "@/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import type { DeliverRepository } from "../../repositories/deliver-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import type { RecipientRepository } from "../../repositories/recipient-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { AdministratorCreationPolicy } from "../../policies/admin/administrator-creation-policy.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    recipientRepository: RecipientRepository;
    delivererRepository: DelivererRepository;
    accountRepository: AccountRepository
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface CreateDeliverUseCaseInput {
    delivererId: string;
    recipientId: string;
    address: string;
    actorId: string
}
export interface CreateDeliverUseCaseResponse {
    deliver: Deliver;
}
export class CreateDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private recipientRepository: RecipientRepository;
    private delivererRepository: DelivererRepository;
    private accountRepository: AccountRepository

    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.recipientRepository = deps.repositories.recipientRepository;
        this.accountRepository = deps.repositories.accountRepository
    }

    async execute(
        input: CreateDeliverUseCaseInput,
    ): Promise<CreateDeliverUseCaseResponse> {
        const delivererId = UniqueEntityId.rehydrate(input.delivererId);
        const recipientId = UniqueEntityId.rehydrate(input.recipientId);
        const actorId = UniqueEntityId.rehydrate(input.actorId)

        const recipientPromise = this.recipientRepository.findById(recipientId);
        const delivererPromise = this.delivererRepository.findById(delivererId);
        const accountPromise = this.accountRepository.findById(actorId)

        const [recipient, deliverer, account] = await Promise.all([
            recipientPromise,
            delivererPromise,
            accountPromise
        ]);

        ensureExists(recipient, "Recipient");
        ensureExists(deliverer, "Deliverer");
        ensureExists(account, "Account");

        AdministratorCreationPolicy.assertCanCreate(account)

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
