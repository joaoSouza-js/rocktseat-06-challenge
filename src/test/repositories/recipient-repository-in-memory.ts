import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { RecipientRepository } from "@/domain/application/repositories/recipent-repository.js";
import type { Recipient } from "@/domain/enterprise/entities/recipient.js";

export class RecipientRepositoryInMemory implements RecipientRepository {
    async findById(id: UniqueEntityId): Promise<Recipient | null> {
        const recipient =
            this.recipients.find((recipient) => recipient.id.equals(id)) || null;
        return recipient;
    }
    private recipients: Recipient[] = [];
    async create(recipient: Recipient): Promise<void> {
        this.recipients.push(recipient);
    }
}
