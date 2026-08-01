import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { Deliver, DeliverProps } from "@/domain/enterprise/entities/deliver.js";
import { faker } from "@faker-js/faker";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location.js";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/services/prisma.service";
import { PrismaDeliverMapper } from "@/infra/database/mappers/prisma-deliver-mapper";

interface makeDeliverProps extends Partial<DeliverProps> { }

export function makeDeliver(props?: makeDeliverProps) {
    const delivererId = props?.delivererId ?? undefined
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

@Injectable()
export class DeliverFactory {
    constructor(private readonly prismaService: PrismaService) { }

    async makePrisma(props?: makeDeliverProps): Promise<Deliver> {
        const deliver = makeDeliver(props);
        const deliverToPersist = PrismaDeliverMapper.toPrisma(deliver);
        await this.prismaService.deliver.create({
            data: deliverToPersist
        });
        return deliver
    }
}
