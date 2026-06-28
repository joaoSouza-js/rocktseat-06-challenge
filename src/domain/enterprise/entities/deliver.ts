import { Entity } from "@/core/entity.js";
import type { UniqueEntityId } from "@/core/unique-entity-id.js";

export enum DeliverStatus {
    PENDING = "PENDING",      // not ready yet (business rules not satisfied)
    READY = "READY",          // ready to be delivered / picked up
    PROGRESS = "PROGRESS",    // currently in delivery
    DELIVERED = "DELIVERED",  // finished
    RETURNED = "RETURNED"
}

export interface DeliverProps {
    delivererId: UniqueEntityId,
    recipientId: UniqueEntityId,
    status: DeliverStatus,
    address: string,
    updatedAt: Date
}

interface CreateDeliverProps {
    delivererId: UniqueEntityId,
    recipientId: UniqueEntityId,
    address: string,
}

export class Deliver extends Entity<DeliverProps> {
    static create(input: CreateDeliverProps): Deliver {
        const deliver = new Deliver({
            ...input,
            status: DeliverStatus.PENDING,
            updatedAt: new Date(),
        })
        return deliver
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    changeStatus(status: DeliverStatus) {
        this.props.status = status
        this.touch()
    }

    get deliveryId(): UniqueEntityId {
        return this.props.delivererId
    }

    get recipientId(): UniqueEntityId {
        return this.props.recipientId
    }

    get address(): string {
        return this.props.address
    }

    get status(): DeliverStatus {
        return this.props.status
    }
}
