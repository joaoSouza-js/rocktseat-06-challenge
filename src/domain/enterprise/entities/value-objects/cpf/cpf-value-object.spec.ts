import { describe, expect, it } from "vitest";
import { ValidationError } from "@/domain/error/validation-error.js";
import { CPFValueObject } from "./cpf-value-object.js";

describe("CPFValueObject", () => {
    it("should create a CPF value object when cpf is valid", () => {
        const cpf = CPFValueObject.create("529.982.247-25");

        expect(cpf.cpf).toBe("52998224725");
    });

    it("should throw ValidationError when cpf is invalid", () => {
        expect(() => CPFValueObject.create("123.456.789-00"))
            .toThrow(ValidationError);
    });

    it("should throw ValidationError with the correct message", () => {
        expect(() => CPFValueObject.create("123.456.789-00"))
            .toThrow("please provide a valid cpf");
    });

    it("should compare two equal cpf value objects", () => {
        const cpf1 = CPFValueObject.create("529.982.247-25");
        const cpf2 = CPFValueObject.create("52998224725");

        expect(cpf1.equals(cpf2)).toBe(true);
    });

    it("should compare two different cpf value objects", () => {
        const cpf1 = CPFValueObject.create("529.982.247-25");
        const cpf2 = CPFValueObject.create("111.444.777-35");

        expect(cpf1.equals(cpf2)).toBe(false);
    });
});