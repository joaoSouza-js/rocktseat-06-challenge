import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { DeliverUpdatePolicy } from "./deliver-update-policy.js";
import { makeDeliverer } from "@/test/factory/make-deliverer.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { NotAllowedError } from "@/domain/error/not-allowed-error.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";

describe("deliver update policy", () => {
    it("should allow to update if deliverer is assigned to deliver", () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliver
        })
        const deliverer = makeDeliverer({
            accountId: account.id
        });
        const deliver = makeDeliver({
            delivererId: deliverer.id
        });

        expect(() => {
            DeliverUpdatePolicy.assertCanUpdate({
                account,
                delivererId: deliverer.id,
                deliver
            });
        }).not.toThrow();
    });

    it("should throw a MissingPermissionError if deliverer is not deliverer", () => {
        const account = makeAccount({
            permissions: PermissionPresets.user
        })
        const deliverer = makeDeliverer({
            accountId: account.id
        });
        const deliver = makeDeliver({
            delivererId: deliverer.id
        });

        expect(() => DeliverUpdatePolicy.assertCanUpdate({
            account,
            delivererId: deliverer.id,
            deliver
        })).toThrow(MissingPermissionError);
    });

    it("should throw a NotAllowedError if deliverer is not assigned to deliver", () => {
        const account = makeAccount({
            permissions: [PermissionType.DELIVER_UPDATE]
        })
        const deliverer = makeDeliverer({
            accountId: account.id
        });
        const deliver = makeDeliver({});

        expect(() => DeliverUpdatePolicy.assertCanUpdate({
            account,
            delivererId: deliverer.id,
            deliver
        })).toThrow(NotAllowedError);
    });
});