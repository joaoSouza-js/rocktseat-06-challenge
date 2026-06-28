import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permisions-preset.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { createDeliverPolicy } from "./create-deliver-policy.js";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";

describe("create deliver policy", () => {
    it("should be able to create a deliver", () => {
        const account = makeAccount({
            permissions: PermissionPresets.admin
        })

        expect(() => {
            createDeliverPolicy.assertCanCreate(account);
        }).not.toThrow();
    });

    it("should throw a CredentialsInvalid Error", () => {
        const account = makeAccount({
            permissions: PermissionPresets.user
        })

        expect(() => createDeliverPolicy.assertCanCreate(account)).toThrow(CredentialsInvalid);
    });
});