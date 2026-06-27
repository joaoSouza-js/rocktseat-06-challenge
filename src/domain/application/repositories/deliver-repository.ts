import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { Deliver } from "@/domain/enterprise/entities/deliver.js";

export interface DeliverRepository {
    create(deliver: Deliver): Promise<void>;
    findById(id: UniqueEntityId): Promise<Deliver | null>;
}
