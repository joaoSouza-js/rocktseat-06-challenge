import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";

interface DeliverUpdatePolicyProps {
    account: Account;
    deliverer: Deliverer;
    deliver: Deliver;
}

export class DeliverUpdatePolicy {
    static assertCanUpdate(props: DeliverUpdatePolicyProps) {
        const { account, deliver, deliverer } = props;

        const hasPermission = account.hasPermission(PermissionType.DELIVER_UPDATE);
        const isDelivererAssigned = deliver.deliveryId.equals(deliverer.id);


        if (hasPermission === false || isDelivererAssigned === false) {
            throw new CredentialsInvalid()
        }
    }
}