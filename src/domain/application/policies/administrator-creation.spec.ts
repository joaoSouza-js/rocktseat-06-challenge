import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";
import { AdministratorCreationPolicy } from "./administrator-creation-policy.js";

describe("administrator creation policy", () => {
    it("should create a resource without error", () => {
        const account = makeAccount({
            permissions: PermissionPresets.admin
        })

        expect(() => {
            AdministratorCreationPolicy.assertCanCreate(account);
        }).not.toThrow();
    });

    it("should throw a CredentialsInvalid Error", () => {
        const account = makeAccount({
            permissions: PermissionPresets.user
        })

        expect(() => AdministratorCreationPolicy.assertCanCreate(account)).toThrow(CredentialsInvalid);
    });
});