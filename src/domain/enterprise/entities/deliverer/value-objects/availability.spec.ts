import { describe, expect, it } from "vitest";
import {
    Availability,
    AvailabilityValueObject,
} from "./availability.js";

describe("AvailabilityValueObject", () => {
    it("should create an available availability", () => {
        const availability = AvailabilityValueObject.create(
            Availability.AVAILABLE,
        );

        expect(availability.current).toBe(Availability.AVAILABLE);
    });

    it("should identify when a deliverer can receive deliveries", () => {
        const availability = AvailabilityValueObject.create(
            Availability.AVAILABLE,
        );

        expect(availability.canReceiveDeliveries()).toBe(true);
    });

    it("should not allow deliveries when in route", () => {
        const availability = AvailabilityValueObject.create(
            Availability.IN_ROUTE,
        );

        expect(availability.canReceiveDeliveries()).toBe(false);
    });

    it("should identify working statuses", () => {
        expect(
            AvailabilityValueObject.create(
                Availability.AVAILABLE,
            ).isWorking(),
        ).toBe(true);

        expect(
            AvailabilityValueObject.create(
                Availability.BUSY,
            ).isWorking(),
        ).toBe(true);

        expect(
            AvailabilityValueObject.create(
                Availability.IN_ROUTE,
            ).isWorking(),
        ).toBe(true);
    });

    it("should identify non-working statuses", () => {
        expect(
            AvailabilityValueObject.create(
                Availability.OFFLINE,
            ).isWorking(),
        ).toBe(false);

        expect(
            AvailabilityValueObject.create(
                Availability.ON_BREAK,
            ).isWorking(),
        ).toBe(false);

        expect(
            AvailabilityValueObject.create(
                Availability.SUSPENDED,
            ).isWorking(),
        ).toBe(false);
    });

    it("should identify offline status", () => {
        const availability = AvailabilityValueObject.create(
            Availability.OFFLINE,
        );

        expect(availability.isOffline()).toBe(true);
    });

    it("should identify suspended status", () => {
        const availability = AvailabilityValueObject.create(
            Availability.SUSPENDED,
        );

        expect(availability.isSuspended()).toBe(true);
    });

    it("should compare two equal availability values", () => {
        const availability1 = AvailabilityValueObject.create(
            Availability.AVAILABLE,
        );

        const availability2 = AvailabilityValueObject.create(
            Availability.AVAILABLE,
        );

        expect(availability1.equals(availability2)).toBe(true);
    });

    it("should compare two different availability values", () => {
        const availability1 = AvailabilityValueObject.create(
            Availability.AVAILABLE,
        );

        const availability2 = AvailabilityValueObject.create(
            Availability.BUSY,
        );

        expect(availability1.equals(availability2)).toBe(false);
    });
});