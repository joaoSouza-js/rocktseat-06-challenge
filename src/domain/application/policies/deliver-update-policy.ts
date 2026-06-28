import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";

interface DeliverUpdatePolicyProps {
    account: Account;
    delivererId: UniqueEntityId;
    deliver: Deliver;
}

export class DeliverUpdatePolicy {
    static assertCanUpdate(props: DeliverUpdatePolicyProps) {
        const { account, deliver, delivererId } = props;

        const hasPermission = account.hasPermission(PermissionType.DELIVER_UPDATE);
        const isDelivererAssigned = deliver.deliveryId.equals(delivererId);


        if (hasPermission === false || isDelivererAssigned === false) {
            throw new CredentialsInvalid()
        }
    }
}