import { describe, expect, it } from "vitest";

import { isCpfValid } from "./cpf-validator.js";

describe("isCpfValid", () => {
    it("should return true for a valid CPF", () => {
        expect(isCpfValid("52998224725")).toBe(true);
    });

    it("should return true for a formatted valid CPF", () => {
        expect(isCpfValid("529.982.247-25")).toBe(true);
    });

    it("should return false when CPF has less than 11 digits", () => {
        expect(isCpfValid("123456789")).toBe(false);
    });

    it("should return false when CPF has more than 11 digits", () => {
        expect(isCpfValid("123456789012")).toBe(false);
    });

    it("should return false when all digits are equal", () => {
        expect(isCpfValid("11111111111")).toBe(false);
    });

    it("should return false for an invalid CPF", () => {
        expect(isCpfValid("52998224724")).toBe(false);
    });

    it("should return false for an invalid formatted CPF", () => {
        expect(isCpfValid("529.982.247-24")).toBe(false);
    });

    it("should return false for an empty string", () => {
        expect(isCpfValid("")).toBe(false);
    });
});