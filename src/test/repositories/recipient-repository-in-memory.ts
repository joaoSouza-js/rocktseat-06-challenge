import type { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import type { RecipientRepository } from "@/domain/application/repositories/recipient-repository.js";
import type { Recipient } from "@/domain/enterprise/entities/recipient.js";

export class RecipientRepositoryInMemory implements RecipientRepository {

    private recipients: Recipient[] = [];

    async delete(id: UniqueEntityId): Promise<void> {
        const recipientIndex = this.recipients.findIndex(
            (recipient) => recipient.id.equals(id),
        )
        this.recipients.splice(recipientIndex, 1);
    }
    async update(recipient: Recipient): Promise<void> {
        const recipientIndex = this.recipients.findIndex(
            (recipient) => recipient.id.equals(recipient.id),
        )
        this.recipients[recipientIndex] = recipient
    }
    async findById(id: UniqueEntityId): Promise<Recipient | null> {
        const recipient =
            this.recipients.find((recipient) => recipient.id.equals(id)) || null;
        return recipient;
    }

    async create(recipient: Recipient): Promise<void> {
        this.recipients.push(recipient);
    }
}
