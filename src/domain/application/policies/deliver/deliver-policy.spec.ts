import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { DeliverPolicy } from "./deliver-policy.js";

describe("DeliverPolicy", () => {
    describe("assertCanCreate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVER_CREATE],
            });

            expect(() =>
                DeliverPolicy.assertCanCreate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DeliverPolicy.assertCanCreate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanUpdate", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVER_UPDATE],
            });

            expect(() =>
                DeliverPolicy.assertCanUpdate(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DeliverPolicy.assertCanUpdate(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanDelete", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVER_DELETE],
            });

            expect(() =>
                DeliverPolicy.assertCanDelete(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DeliverPolicy.assertCanDelete(account),
            ).toThrow(MissingPermissionError);
        });
    });

    describe("assertCanView", () => {
        it("should allow when permission exists", () => {
            const account = makeAccount({
                permissions: [PermissionType.DELIVERER_VIEW],
            });

            expect(() =>
                DeliverPolicy.assertCanView(account),
            ).not.toThrow();
        });

        it("should throw when permission is missing", () => {
            const account = makeAccount({
                permissions: [],
            });

            expect(() =>
                DeliverPolicy.assertCanView(account),
            ).toThrow(MissingPermissionError);
        });
    });
});