import { Entity } from "@/core/entity.js";
import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { AvailabilityValueObject } from "./value-objects/availability.js";
import type { ScheduleValueObject } from "./value-objects/schedule.js";

export interface DelivererProps {
    accountId: UniqueEntityId;
    schedule: ScheduleValueObject;
    availability: AvailabilityValueObject;
}

interface CreateDelivererInput {
    accountId: UniqueEntityId;
    schedule: ScheduleValueObject;
    availability: AvailabilityValueObject;
}

export class Deliverer extends Entity<DelivererProps> {
    static create(input: CreateDelivererInput): Deliverer {
        return new Deliverer({
            accountId: input.accountId,
            schedule: input.schedule,
            availability: input.availability,
        });
    }

    static rehydrate(props: DelivererProps): Deliverer {
        return new Deliverer(props);
    }

    get accountId(): UniqueEntityId {
        return this.props.accountId;
    }
    get schedule(): ScheduleValueObject {
        return this.props.schedule
    }
    get availability(): AvailabilityValueObject {
        return this.props.availability
    }
}
