import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { Recipient } from "@/domain/enterprise/entities/recipient.js";

export interface RecipientRepository {
    create(recipient: Recipient): Promise<void>;
    findById(id: UniqueEntityId): Promise<Recipient | null
    >;
}
