import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { DelivererPolicy } from "./deliverer-policy.js";

describe("DelivererPolicy", () => {
    describe("assertCanCreate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVERER_CREATE],
            });

            expect(() =>
                DelivererPolicy.assertCanCreate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DelivererPolicy.assertCanCreate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanUpdate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVERER_UPDATE],
            });

            expect(() =>
                DelivererPolicy.assertCanUpdate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DelivererPolicy.assertCanUpdate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanDelete", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVERER_DELETE],
            });

            expect(() =>
                DelivererPolicy.assertCanDelete(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DelivererPolicy.assertCanDelete(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanView", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.VIEW],
            });

            expect(() =>
                DelivererPolicy.assertCanView(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DelivererPolicy.assertCanView(account),
            ).toThrow(MissingPermissionError);
        });
    });
});