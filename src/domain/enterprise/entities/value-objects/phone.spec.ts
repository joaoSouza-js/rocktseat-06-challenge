import { describe, expect, it } from "vitest";
import { PhoneValueObject } from "./phone.js";

describe("PhoneValueObject", () => {
    it("should create a valid phone", () => {
        const phone = PhoneValueObject.create("+5511987654321");

        expect(phone.value).toBe("+5511987654321");
    });

    it("should normalize spaces and hyphens", () => {
        const phone = PhoneValueObject.create("+55 11-98765-4321");

        expect(phone.value).toBe("+5511987654321");
    });

    it("should throw when phone does not start with +", () => {
        expect(() => {
            PhoneValueObject.create("5511987654321");
        }).toThrow("Invalid phone");
    });

    it("should throw when phone contains too few digits", () => {
        expect(() => {
            PhoneValueObject.create("+55123");
        }).toThrow("Invalid phone");
    });

    it("should throw when phone contains too many digits", () => {
        expect(() => {
            PhoneValueObject.create("+1234567890123456");
        }).toThrow("Invalid phone");
    });

    it("should throw when phone contains invalid characters", () => {
        expect(() => {
            PhoneValueObject.create("+55abc987654321");
        }).toThrow("Invalid phone");
    });

    it("should return true when phones are equal", () => {
        const phone1 = PhoneValueObject.create("+5511987654321");
        const phone2 = PhoneValueObject.create("+55 11-98765-4321");

        expect(phone1.equals(phone2)).toBe(true);
    });

    it("should return false when phones are different", () => {
        const phone1 = PhoneValueObject.create("+5511987654321");
        const phone2 = PhoneValueObject.create("+5511999999999");

        expect(phone1.equals(phone2)).toBe(false);
    });
});