import { randomUUID } from "node:crypto"

export class UniqueEntityId {
    private readonly value: string

    constructor(value: string) {
        this.value = value
    }

    static create(): UniqueEntityId {
        const id = randomUUID()
        const uniqueEntityId = new UniqueEntityId(id)
        return uniqueEntityId
    }

    static rehydrate(id: string): UniqueEntityId {
        const uniqueEntityId = new UniqueEntityId(id)
        return uniqueEntityId
    }

    toString(): string {
        return this.value
    }

    equals(other: UniqueEntityId): boolean {
        const isSame = other.value === this.value
        return isSame
    }

}