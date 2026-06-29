import { Entity } from "@/core/entity.js";
import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import { LocationValueObject } from "./value-objects/location.js";

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
    location: LocationValueObject,
    updatedAt: Date
}

interface CreateDeliverProps {
    delivererId: UniqueEntityId,
    recipientId: UniqueEntityId,
    location: LocationValueObject,

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

    get location(): LocationValueObject {
        return this.props.location
    }

    get status(): DeliverStatus {
        return this.props.status
    }
}
