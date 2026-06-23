import { Entity } from "@/core/entity.js";
import type { UniqueEntityId } from "@/core/unique-entity-id.js";

export enum DeliverStatus {
    HOLDING = "HOLDING",
    PROGRESS = "PROGRESS",
    DELIVERED = "DELIVERED"
}

interface DeliverProps {
    deliveryId: UniqueEntityId,
    recipientId: UniqueEntityId,
    status: DeliverStatus,
    updatedAt: Date
}

export class Deliver extends Entity<DeliverProps> {
    static create(input: DeliverProps): Deliver {
        const deliver = new Deliver(input)
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
        return this.props.deliveryId
    }

    get recipientId(): UniqueEntityId {
        return this.props.recipientId
    }
}
