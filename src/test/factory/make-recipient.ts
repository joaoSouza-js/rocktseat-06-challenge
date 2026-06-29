import { faker } from "@faker-js/faker/locale/pt_BR";
import {
    Recipient,
    type RecipientProps,
} from "@/domain/enterprise/entities/recipient.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";
import { fakeBRPhone } from "./fake-phone.js";
import { UniqueEntityId } from "@/core/unique-entity-id.js";
import { randomUUID } from "node:crypto";

interface makeRecipientProps extends Partial<RecipientProps> { }

export function makeRecipient(props?: makeRecipientProps) {
    const address = props?.address ?? faker.location.streetAddress();
    const name = props?.name ?? faker.person.fullName();
    const phone = props?.phone ?? PhoneValueObject.create(fakeBRPhone());
    const accountId = props?.accountId ?? UniqueEntityId.rehydrate(randomUUID());
    const recipient = Recipient.create({
        accountId: accountId,
        address: address,
        name: name,
        phone,
    });

    return recipient;
}
