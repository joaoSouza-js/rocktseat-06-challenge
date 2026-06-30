import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { Deliver } from "@/domain/enterprise/entities/deliver.js";
import { MissingPermissionError } from "@/domain/error/missing-permission-error.js";
import { NotAllowedError } from "@/domain/error/not-allowed-error.js";

interface DeliverDeliverViewPolicyProps {
    account: Account;
    delivererId: UniqueEntityId;
    deliver: Deliver;
}

export class DeliverDeliverViewPolicy {
    static assertCanView(props: DeliverDeliverViewPolicyProps) {
        const { account, deliver, delivererId } = props;

        const hasPermission = account.hasPermission(PermissionType.DELIVER_VIEW);
        const isDelivererAssigned = deliver.deliveryId.equals(delivererId);

        if (hasPermission === false) {
            throw new MissingPermissionError(PermissionType.DELIVER_VIEW)
        }


        if (isDelivererAssigned === false) {
            throw new NotAllowedError()
        }
    }
}