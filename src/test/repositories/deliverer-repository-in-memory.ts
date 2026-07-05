import type { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import type { DelivererRepository } from "@/domain/application/repositories/deliverer-repository.js";
import type { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";

export class DelivererRepositoryInMemory implements DelivererRepository {
    async delete(id: UniqueEntityId): Promise<void> {
        const delivererIndex = this.deliverers.findIndex((deliverer) => deliverer.id.equals(id));
        this.deliverers.splice(delivererIndex, 1);
    }
    update(deliverer: Deliverer): Promise<void> {
        throw new Error("Method not implemented.");
    }
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
