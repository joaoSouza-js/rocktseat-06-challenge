
import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Recipient, } from "@/domain/enterprise/entities/recipient";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone";

import { AccountCreateNestedOneWithoutRecipientInput, RecipientCreateInput, RecipientModel } from "@/generated/prisma/models";


export class PrismaRecipientMapper {
    static toDomain(raw: RecipientModel): Recipient {
        const recipientId = UniqueEntityId.rehydrate(raw.id);
        const accountId = raw.accountId ? UniqueEntityId.rehydrate(raw.accountId) : undefined;
        const domain: Recipient = Recipient.rehydrate({
            accountId: accountId,
            name: raw.name,
            phone: PhoneValueObject.rehydrate(raw.phone),
        }, recipientId);

        return domain

    }

    static toPrisma(recipient: Recipient): RecipientCreateInput {

        const accountConnection: AccountCreateNestedOneWithoutRecipientInput | undefined = recipient.accountId ? {
            connect: {
                id: recipient.accountId.toString()
            }
        } : undefined

        const model: RecipientCreateInput = {
            id: recipient.id.toString(),
            name: recipient.name,
            phone: recipient.phone.value,
            account: accountConnection
        }

        return model
    }
}