import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { AdministratorCreationPolicy } from "./administrator-creation-policy.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";

describe("administrator creation policy", () => {
    it("should create a resource without error", () => {
        const account = makeAccount({
            permissions: PermissionPresets.admin
        })

        expect(() => {
            AdministratorCreationPolicy.assertCanCreate(account);
        }).not.toThrow();
    });

    it("should throw a MissingPermissionError Error", () => {
        const account = makeAccount({
            permissions: PermissionPresets.user
        })

        expect(() => AdministratorCreationPolicy.assertCanCreate(account)).toThrow(MissingPermissionError);
    });
});