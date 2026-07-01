import { describe, expect, it } from "vitest";
import { removeNonDigits } from "./remove-non-digits.js";

describe("removeNonDigits", () => {


    it("should return the same string when it contains only digits", () => {
        expect(removeNonDigits("52998224725"))
            .toBe("52998224725");
    });

    it("should remove all non-digit characters", () => {
        expect(removeNonDigits("abc123def456"))
            .toBe("123456");
    });

    it("should return an empty string when input contains no digits", () => {
        expect(removeNonDigits("abc.-/"))
            .toBe("");
    });

    it("should return an empty string when input is empty", () => {
        expect(removeNonDigits(""))
            .toBe("");
    });
});