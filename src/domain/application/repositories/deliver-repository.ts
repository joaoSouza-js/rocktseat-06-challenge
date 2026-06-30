import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { Deliver } from "@/domain/enterprise/entities/deliver.js";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location.js";

export interface DeliverRepository {
    create(deliver: Deliver): Promise<void>;
    findById(id: UniqueEntityId): Promise<Deliver | null>;
    delete(id: UniqueEntityId): Promise<void>;
    update(deliver: Deliver): Promise<void>;
    fetchByRecipientId(recipientId: UniqueEntityId): Promise<Deliver[]>
    fetchByDelivererId(delivererId: UniqueEntityId): Promise<Deliver[]>
    fetchNearestDeliver(location: LocationValueObject, delivererId?: UniqueEntityId): Promise<Deliver[]>
}
