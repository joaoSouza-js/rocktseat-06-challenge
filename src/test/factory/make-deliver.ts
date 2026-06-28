import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Deliver, DeliverProps } from "@/domain/enterprise/entities/deliver.js";
import { faker } from "@faker-js/faker";

interface makeDeliverProps extends Partial<DeliverProps> { }

export function makeDeliver(props?: makeDeliverProps) {
    const delivererId = props?.delivererId ?? UniqueEntityId.rehydrate(randomUUID());
    const address = props?.address ?? faker.location.streetAddress();
    const recipientId = props?.recipientId ?? UniqueEntityId.rehydrate(randomUUID());

    const deliverer = Deliver.create({
        address: address,
        delivererId: delivererId,
        recipientId: recipientId,
    });

    return deliverer
}
