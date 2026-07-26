import { Entity } from "@/domain/core/entity.js";
import type { PhoneValueObject } from "./value-objects/phone.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";

export interface RecipientProps {
    accountId?: UniqueEntityId;
    name: string;
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
            phone: input.phone,
        });
    }

    static rehydrate(props: RecipientProps, id: UniqueEntityId): Recipient {
        return new Recipient(props, id);
    }

    get name(): string {
        return this.props.name;
    }



    get phone(): PhoneValueObject {
        return this.props.phone
    }

    get accountId(): UniqueEntityId | undefined {
        return this.props.accountId;
    }

    changeName(name: string): void {
        this.props.name = name;
    }


}
