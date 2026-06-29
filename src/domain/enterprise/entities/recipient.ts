import { Entity } from "@/core/entity.js";
import type { PhoneValueObject } from "./value-objects/phone.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";

export interface RecipientProps {
    accountId: UniqueEntityId;
    name: string;
    address: string;
    phone: PhoneValueObject;
}

interface CreateRecipientInput {
    accountId: UniqueEntityId;
    name: string;
    address: string;
    phone: PhoneValueObject;
}

export class Recipient extends Entity<RecipientProps> {
    static create(input: CreateRecipientInput): Recipient {
        return new Recipient({
            accountId: input.accountId,
            name: input.name,
            address: input.address,
            phone: input.phone,
        });
    }

    static rehydrate(props: RecipientProps): Recipient {
        return new Recipient(props);
    }

    get name(): string {
        return this.props.name;
    }

    get address(): string {
        return this.props.address;
    }

    get phone(): PhoneValueObject {
        return this.props.phone
    }

    changeName(name: string): void {
        this.props.name = name;
    }

    changeAddress(address: string): void {
        this.props.address = address;
    }
}
