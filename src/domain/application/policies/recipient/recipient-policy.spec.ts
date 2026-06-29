import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { RecipientPolicy } from "./recipient-policy.js";

describe("RecipientPolicy", () => {
    describe("assertCanCreate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.RECIPIENT_CREATE],
            });

            expect(() =>
                RecipientPolicy.assertCanCreate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                RecipientPolicy.assertCanCreate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanUpdate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.RECIPIENT_UPDATE],
            });

            expect(() =>
                RecipientPolicy.assertCanUpdate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                RecipientPolicy.assertCanUpdate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanDelete", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.RECIPIENT_DELETE],
            });

            expect(() =>
                RecipientPolicy.assertCanDelete(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                RecipientPolicy.assertCanDelete(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanView", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.RECIPIENT_VIEW],
            });

            expect(() =>
                RecipientPolicy.assertCanView(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                RecipientPolicy.assertCanView(account),
            ).toThrow(MissingPermissionError);
        });
    });
});