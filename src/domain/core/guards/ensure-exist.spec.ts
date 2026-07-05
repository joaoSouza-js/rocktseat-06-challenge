import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { ResourceNotFound } from "@/domain/error/resouce-not-found.js";
import { ensureExists } from "./ensure-exist.js";

describe("ensure exists guard ", () => {
    const value = null;
    it("should be throw a resourceNotFound error", () => {
        expect(() => {
            ensureExists(value, "resource");
        }).toThrow(ResourceNotFound);
    });
    it("should accept valid value", () => {
        const user = {
            id: randomUUID(),
            name: "joe doe",
        };

        expect(() => ensureExists(user, "User")).not.toThrow();
    });
});
