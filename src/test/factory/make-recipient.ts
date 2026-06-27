import { faker } from "@faker-js/faker/locale/pt_BR";
import {
    Recipient,
    type RecipientProps,
} from "@/domain/enterprise/entities/recipient.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";
import { fakeBRPhone } from "./fake-phone.js";

interface makeRecipientProps extends Partial<RecipientProps> { }

export function makeRecipient(props?: makeRecipientProps) {
    const address = props?.address ?? faker.location.streetAddress();
    const name = props?.name ?? faker.person.fullName();
    const phone = props?.phone ?? PhoneValueObject.create(fakeBRPhone());

    const recipient = Recipient.create({
        address: address,
        name: name,
        phone,
    });

    return recipient;
}
