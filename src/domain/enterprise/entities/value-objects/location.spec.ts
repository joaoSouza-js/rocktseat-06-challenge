import { describe, it, expect } from "vitest";
import { LocationValueObject } from "./location.js";
import { ValidationError } from "@/domain/error/validation-error.js";

describe("LocationValueObject", () => {
    it("should create a valid location", () => {
        const location = LocationValueObject.create({
            address: "Rua A, 123",
            latitude: -23.55,
            longitude: -46.63,
        });

        expect(location.address).toBe("Rua A, 123");
        expect(location.latitude).toBe(-23.55);
        expect(location.longitude).toBe(-46.63);
    });

    it("should trim address before storing", () => {
        const location = LocationValueObject.create({
            address: "   Rua A, 123   ",
            latitude: -23.55,
            longitude: -46.63,
        });

        expect(location.address).toBe("Rua A, 123");
    });

    it("should throw ValidationError for invalid address", () => {
        expect(() => {
            LocationValueObject.create({
                address: "abc",
                latitude: -23.55,
                longitude: -46.63,
            });
        }).toThrow(ValidationError)
    });

    it("should throw ValidationError for NaN latitude", () => {
        expect(() => {
            LocationValueObject.create({
                address: "Rua A, 123",
                latitude: NaN,
                longitude: -46.63,
            });
        }).toThrow(ValidationError)
    });

    it("should throw ValidationError for latitude out of range", () => {
        expect(() => {
            LocationValueObject.create({
                address: "Rua A, 123",
                latitude: 120,
                longitude: -46.63,
            });
        }).toThrow(ValidationError)
    });

    it("should throw ValidationError for longitude out of range", () => {
        expect(() => {
            LocationValueObject.create({
                address: "Rua A, 123",
                latitude: -23.55,
                longitude: 999,
            });
        }).toThrow(ValidationError)
    });

    it("should return true for equal locations", () => {
        const a = LocationValueObject.create({
            address: "Rua A, 123",
            latitude: -23.55,
            longitude: -46.63,
        });

        const b = LocationValueObject.create({
            address: "Rua A, 123",
            latitude: -23.55,
            longitude: -46.63,
        });

        expect(a.equals(b)).toBe(true);
    });

    it("should return false for different locations", () => {
        const a = LocationValueObject.create({
            address: "Rua A, 123",
            latitude: -23.55,
            longitude: -46.63,
        });

        const b = LocationValueObject.create({
            address: "Rua B, 999",
            latitude: -23.55,
            longitude: -46.63,
        });

        expect(a.equals(b)).toBe(false);
    });
});