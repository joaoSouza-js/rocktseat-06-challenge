import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import {
    Deliverer,
    type DelivererProps,
} from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";
import { AvailabilityValueObject } from "@/domain/enterprise/entities/deliverer/value-objects/availability.js";
import { ScheduleValueObject } from "@/domain/enterprise/entities/deliverer/value-objects/schedule.js";

interface makeDelivererProps extends Partial<DelivererProps> { }

export function makeDeliverer(props?: makeDelivererProps) {

    const accountId = props?.accountId ?? UniqueEntityId.rehydrate(randomUUID());
    const schedule = props?.schedule ?? ScheduleValueObject.businessDays();
    const availability =
        props?.availability ?? AvailabilityValueObject.available();

    const deliverer = Deliverer.create({
        accountId: accountId,
        availability: availability,
        schedule: schedule,
    });

    return deliverer
}
