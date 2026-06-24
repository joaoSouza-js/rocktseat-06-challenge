import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";

export interface DelivererRepository {
    create(deliverer: Deliverer): Promise<void>;
    findById(id: UniqueEntityId): Promise<Deliverer | null>;
}
