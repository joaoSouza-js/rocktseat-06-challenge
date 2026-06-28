import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { describe, expect, it } from "vitest";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";
import { DeliverUpdatePolicy } from "./deliver-update-policy.js";
import { makeDelivery } from "@/test/factory/make-delivery.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";

describe("deliver update policy", () => {
    it("should allow to update if deliverer is assigned to deliver", () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliver
        })
        const deliverer = makeDelivery({
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

    it("should throw a CredentialsInvalid if deliverer is not deliverer", () => {
        const account = makeAccount({
            permissions: PermissionPresets.user
        })
        const deliverer = makeDelivery({
            accountId: account.id
        });
        const deliver = makeDeliver({
            delivererId: deliverer.id
        });

        expect(() => DeliverUpdatePolicy.assertCanUpdate({
            account,
            delivererId: deliverer.id,
            deliver
        })).toThrow(CredentialsInvalid);
    });

    it("should throw a CredentialsInvalid if deliverer is not assigned to deliver", () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliver
        })
        const deliverer = makeDelivery({
            accountId: account.id
        });
        const deliver = makeDeliver({});

        expect(() => DeliverUpdatePolicy.assertCanUpdate({
            account,
            delivererId: deliverer.id,
            deliver
        })).toThrow(CredentialsInvalid);
    });
});