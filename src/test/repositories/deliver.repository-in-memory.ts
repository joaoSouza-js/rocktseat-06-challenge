import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { DeliverRepository } from "@/domain/application/repositories/deliver-repository.js";
import { type Deliver } from "@/domain/enterprise/entities/deliver.js";

export class DeliverRepositoryInMemory implements DeliverRepository {
    async fetchByDelivererId(delivererId: UniqueEntityId): Promise<Deliver[]> {
        const delivers = this.delivers.filter((deliver) => deliver.deliveryId.equals(delivererId));
        return delivers
    }
    async fetchByRecipientId(recipientId: UniqueEntityId): Promise<Deliver[]> {
        const delivers = this.delivers.filter((deliver) => deliver.recipientId.equals(recipientId));
        return delivers
    }
    async delete(id: UniqueEntityId): Promise<void> {
        const deliverIndex = this.delivers.findIndex((deliver) => deliver.id.equals(id));
        this.delivers.splice(deliverIndex, 1);

    }
    async update(updateDeliver: Deliver): Promise<void> {
        const deliverIndex = this.delivers.findIndex((deliver) => deliver.id.equals(updateDeliver.id));
        this.delivers[deliverIndex] = updateDeliver
    }

    async findById(id: UniqueEntityId): Promise<Deliver | null> {
        const deliver =
            this.delivers.find((deliver) => deliver.id.equals(id)) || null;
        return deliver;
    }
    private delivers: Deliver[] = [];
    async create(deliver: Deliver): Promise<void> {
        this.delivers.push(deliver);
    }

}
