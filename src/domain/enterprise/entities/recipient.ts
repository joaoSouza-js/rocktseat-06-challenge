import { Entity } from "@/core/entity.js";

interface RecipientProps {
    name: string;
    address: string;
}

interface CreateRecipientInput {
    name: string;
    address: string;
}

export class Recipient extends Entity<RecipientProps> {
    static create(input: CreateRecipientInput): Recipient {
        return new Recipient({
            name: input.name,
            address: input.address,
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

    changeName(name: string): void {
        this.props.name = name;
    }

    changeAddress(address: string): void {
        this.props.address = address;
    }
}