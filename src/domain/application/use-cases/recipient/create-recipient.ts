import { Recipient } from "@/domain/enterprise/entities/recipient.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";
import type { RecipientRepository } from "../../repositories/recipient-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { AdministratorCreationPolicy } from "../../policies/admin/administrator-creation-policy.js";
import { ensureExists } from "@/domain/core/guards/ensure-exist.js";

interface Repositories {
    recipientRepository: RecipientRepository;
    accountRepository: AccountRepository;

}

interface AccountUseCaseDeps {
    repositories: Repositories;
}

export interface CreateRecipientUseCaseInput {
    actorId: string
    address: string;
    recipientAccountId: string;
    name: string;
    phone: string;
}
export interface CreateRecipientUseCaseResponse {
    recipient: Recipient;
}

export class CreateRecipientUseCase {
    private recipientRepository: RecipientRepository;
    private accountRepository: AccountRepository;

    constructor(deps: AccountUseCaseDeps) {
        this.recipientRepository = deps.repositories.recipientRepository;
        this.accountRepository = deps.repositories.accountRepository;

    }

    async execute(
        input: CreateRecipientUseCaseInput,
    ): Promise<CreateRecipientUseCaseResponse> {

        const actorId = UniqueEntityId.rehydrate(input.actorId);
        const actorAccount = await this.accountRepository.findById(actorId);

        ensureExists(actorAccount, "Account");
        AdministratorCreationPolicy.assertCanCreate(actorAccount);

        const accountId = UniqueEntityId.rehydrate(input.recipientAccountId);
        const account = await this.accountRepository.findById(accountId);
        ensureExists(account, "Account");

        const phone = PhoneValueObject.create(input.phone);
        const recipient = Recipient.create({
            accountId: accountId,
            address: input.address,
            name: input.name,
            phone: phone,
        });

        await this.recipientRepository.create(recipient);

        return {

            recipient: recipient,
        };
    }
}
