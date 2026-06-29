import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { NotAllowedError } from "@/domain/error/not-allowed-error.js";

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

        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVER_UPDATE)
        }


        if (isDelivererAssigned === false) {
            throw new NotAllowedError()
        }
    }
}