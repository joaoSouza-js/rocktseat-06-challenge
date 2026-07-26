
import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Deliver, DeliverStatus } from "@/domain/enterprise/entities/deliver";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location";
import { $Enums } from "@/generated/prisma/client";
import { DeliverCreateInput, DeliverModel } from "@/generated/prisma/models";


export class PrismaDeliverMapper {
    static toDomain(raw: DeliverModel): Deliver {
        const deliverId = UniqueEntityId.rehydrate(raw.id);
        const delivererId = UniqueEntityId.rehydrate(raw.delivererId);
        const recipientId = UniqueEntityId.rehydrate(raw.recipientId);
        const location = LocationValueObject.create({
            latitude: raw.latitude,
            longitude: raw.longitude
        })


        const domain = Deliver.rehydrate({
            delivererId: delivererId,
            recipientId: recipientId,
            location: location,
            status: DeliverStatus[raw.status],
            updatedAt: raw.updatedAt

        }, deliverId)

        return domain

    }

    static toPrisma(deliver: Deliver): DeliverCreateInput {
        const model: DeliverCreateInput = {
            id: deliver.deliveryId.toString(),
            address: deliver.location.address ?? "",
            deliverer: {
                connect: {
                    id: deliver.deliveryId.toString()
                }
            },
            recipient: {
                connect: {
                    id: deliver.recipientId.toString()
                }
            },

            latitude: deliver.location.latitude,
            longitude: deliver.location.longitude,

            status: $Enums.DeliveryStatus[deliver.status],

        }

        return model
    }
}