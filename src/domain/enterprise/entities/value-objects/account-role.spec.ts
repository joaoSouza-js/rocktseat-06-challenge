import { describe, expect, it } from "vitest";
import { ValidationError } from "@/domain/error/validation-error.js";
import { RoleType, RoleValueObject } from "./account-role.js";

describe("RoleValueObject", () => {
    it("should create ADMIN role from string", () => {
        const role = RoleValueObject.create("ADMIN");

        expect(role.isAdmin()).toBe(true);
        expect(role.isDeliverer()).toBe(false);
        expect(role.value).toBe(RoleType.ADMIN);
    });

    it("should create DELIVERER role from string", () => {
        const role = RoleValueObject.create("DELIVERER");

        expect(role.isDeliverer()).toBe(true);
        expect(role.isAdmin()).toBe(false);
        expect(role.value).toBe(RoleType.DELIVERER);
    });

    it("should throw ValidationError for invalid role", () => {
        expect(() => {
            RoleValueObject.create("HACKER");
        }).toThrow(ValidationError);
    });

    it("should create admin using factory method", () => {
        const role = RoleValueObject.admin();

        expect(role.value).toBe(RoleType.ADMIN);
        expect(role.isAdmin()).toBe(true);
    });

    it("should create deliverer using factory method", () => {
        const role = RoleValueObject.deliverer();

        expect(role.value).toBe(RoleType.DELIVERER);
        expect(role.isDeliverer()).toBe(true);
    });

    it("should correctly compare roles", () => {
        const role1 = RoleValueObject.create("ADMIN");
        const role2 = RoleValueObject.admin();

        expect(role1.equals(role2)).toBe(true);
    });

    it("should not equal different roles", () => {
        const admin = RoleValueObject.admin();
        const deliverer = RoleValueObject.deliverer();

        expect(admin.equals(deliverer)).toBe(false);
    });
});
