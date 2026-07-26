import { ensureExists } from "@/domain/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { RecipientRepository } from "../../repositories/recipient-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { AdministratorCreationPolicy } from "../../policies/admin/administrator-creation-policy.js";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location.js";

interface Repositories {
    deliverRepository: DeliverRepository;
    recipientRepository: RecipientRepository;
    accountRepository: AccountRepository
}

interface DeliverUseCaseDeps {
    repositories: Repositories;
}

export interface CreateDeliverUseCaseInput {
    recipientId: string;
    address: string;
    latitude: number;
    longitude: number;
    actorId: string
}
export interface CreateDeliverUseCaseResponse {
    deliver: Deliver;
}
export class CreateDeliverUseCase {
    private deliverRepository: DeliverRepository;
    private recipientRepository: RecipientRepository;
    private accountRepository: AccountRepository

    constructor(deps: DeliverUseCaseDeps) {
        this.deliverRepository = deps.repositories.deliverRepository;
        this.recipientRepository = deps.repositories.recipientRepository;
        this.accountRepository = deps.repositories.accountRepository
    }

    async execute(
        input: CreateDeliverUseCaseInput,
    ): Promise<CreateDeliverUseCaseResponse> {
        const recipientId = UniqueEntityId.rehydrate(input.recipientId);
        const actorId = UniqueEntityId.rehydrate(input.actorId)

        const recipientPromise = this.recipientRepository.findById(recipientId);
        const accountPromise = this.accountRepository.findById(actorId)

        const [recipient, account] = await Promise.all([
            recipientPromise,
            accountPromise
        ]);

        ensureExists(recipient, "Recipient");
        ensureExists(account, "Account");

        AdministratorCreationPolicy.assertCanCreate(account)

        const location = LocationValueObject.create({
            address: input.address,
            latitude: input.latitude,
            longitude: input.longitude
        })

        const deliver = Deliver.create({
            location: location,
            recipientId: recipientId,
        });

        await this.deliverRepository.create(deliver);

        return {
            deliver,
        };
    }
}
