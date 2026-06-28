import { Recipient } from "@/domain/enterprise/entities/recipient.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";
import type { RecipientRepository } from "../repositories/recipient-repository.js";

interface Repositories {
    recipientRepository: RecipientRepository;
}

interface AccountUseCaseDeps {
    repositories: Repositories;
}

export interface CreateRecipientUseCaseInput {
    address: string;
    name: string;
    phone: string;
}
export interface CreateRecipientUseCaseResponse {
    recipient: Recipient;
}

export class CreateRecipientUseCase {
    private recipientRepository: RecipientRepository;

    constructor(deps: AccountUseCaseDeps) {
        this.recipientRepository = deps.repositories.recipientRepository;
    }

    async execute(
        input: CreateRecipientUseCaseInput,
    ): Promise<CreateRecipientUseCaseResponse> {
        const phone = PhoneValueObject.create(input.phone);
        const recipient = Recipient.create({
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
