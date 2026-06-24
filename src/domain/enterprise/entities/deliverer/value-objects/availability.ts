export enum Availability {
    AVAILABLE = "available",
    IN_ROUTE = "in_route",
    OFFLINE = "offline",
    ON_BREAK = "on_break",
    SUSPENDED = "suspended",
    BUSY = "busy",
}

export class AvailabilityValueObject {
    private constructor(
        private readonly value: Availability,
    ) { }

    static create(value: Availability): AvailabilityValueObject {
        return new AvailabilityValueObject(value);
    }

    static available(): AvailabilityValueObject {
        return new AvailabilityValueObject(Availability.AVAILABLE);

    }

    get current(): Availability {
        return this.value;
    }

    isAvailable(): boolean {
        return this.value === Availability.AVAILABLE;
    }

    canReceiveDeliveries(): boolean {
        return this.value === Availability.AVAILABLE;
    }

    isWorking(): boolean {
        return [
            Availability.AVAILABLE,
            Availability.BUSY,
            Availability.IN_ROUTE,
        ].includes(this.value);
    }

    isOffline(): boolean {
        return this.value === Availability.OFFLINE;
    }

    isSuspended(): boolean {
        return this.value === Availability.SUSPENDED;
    }

    equals(other: AvailabilityValueObject): boolean {
        return this.value === other.value;
    }
}