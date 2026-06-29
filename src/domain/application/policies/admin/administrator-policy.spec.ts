import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { AdministratorPolicy } from "./administrator-policy.js";

describe("AdministratorPolicy", () => {
    describe("assertCanCreate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.ADMIN_CREATE],
            });

            expect(() =>
                AdministratorPolicy.assertCanCreate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                AdministratorPolicy.assertCanCreate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanUpdate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.ADMIN_UPDATE],
            });

            expect(() =>
                AdministratorPolicy.assertCanUpdate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                AdministratorPolicy.assertCanUpdate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanDelete", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.ADMIN_DELETE],
            });

            expect(() =>
                AdministratorPolicy.assertCanDelete(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                AdministratorPolicy.assertCanDelete(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanView", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.VIEW],
            });

            expect(() =>
                AdministratorPolicy.assertCanView(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                AdministratorPolicy.assertCanView(account),
            ).toThrow(MissingPermissionError);
        });
    });
});