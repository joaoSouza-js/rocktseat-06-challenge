import { Deliver } from "@/domain/enterprise/entities/deliver"

export class DeliverPresenter {
    static toHttp(deliver: Deliver) {
        const presenterDeliver = {
            id: deliver.id.toString(),
            location: {
                address: deliver.location.address,
                latitude: deliver.location.latitude,
                longitude: deliver.location.longitude
            }

        }

        return presenterDeliver
    }
}