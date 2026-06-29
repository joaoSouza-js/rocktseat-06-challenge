import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver, DeliverProps } from "@/domain/enterprise/entities/deliver.js";
import { faker } from "@faker-js/faker";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location.js";

interface makeDeliverProps extends Partial<DeliverProps> { }

export function makeDeliver(props?: makeDeliverProps) {
    const delivererId = props?.delivererId ?? UniqueEntityId.rehydrate(randomUUID());
    const recipientId = props?.recipientId ?? UniqueEntityId.rehydrate(randomUUID());

    const fakeLocation = LocationValueObject.create({
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
    })

    const location = props?.location ?? fakeLocation

    const deliverer = Deliver.create({
        location: location,
        delivererId: delivererId,
        recipientId: recipientId,
    });

    return deliverer
}
