import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { DelivererRepository } from "@/domain/application/repositories/deliverer-repository.js";
import type { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";

export class DelivererRepositoryInMemory implements DelivererRepository {
    async findById(id: UniqueEntityId): Promise<Deliverer | null> {
        const deliverer = this.deliverers.find((deliverer) =>
            deliverer.id.equals(id),
        ) || null
        return deliverer
    }
    private deliverers: Deliverer[] = [];
    async create(deliverer: Deliverer): Promise<void> {
        this.deliverers.push(deliverer);
    }
}
