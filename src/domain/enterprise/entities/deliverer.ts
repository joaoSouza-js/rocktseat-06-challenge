import { Entity } from "@/core/entity.js";

interface DelivererProps {
    accountId: string;
    name: string;
    schedule: string
    availability: string
}

interface CreateDelivererInput {
    accountId: string;
    name: string;
    schedule: string,
    availability: string

}

export class Deliverer extends Entity<DelivererProps> {
    static create(input: CreateDelivererInput): Deliverer {
        return new Deliverer({
            accountId: input.accountId,
            name: input.name,
            schedule: input.schedule,
            availability: input.availability

        });
    }

    static rehydrate(props: DelivererProps): Deliverer {
        return new Deliverer(props);
    }

    get accountId(): string {
        return this.props.accountId;
    }

    get name(): string {
        return this.props.name;
    }

    changeName(name: string): void {
        this.props.name = name;
    }
}