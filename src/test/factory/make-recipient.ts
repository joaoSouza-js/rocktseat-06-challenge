import { faker } from "@faker-js/faker/locale/pt_BR";
import {
    Recipient,
    type RecipientProps,
} from "@/domain/enterprise/entities/recipient.js";
import { PhoneValueObject } from "@/domain/enterprise/entities/value-objects/phone.js";
import { fakeBRPhone } from "./fake-phone.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/services/prisma.service.js";
import { PrismaRecipientMapper } from "@/infra/database/mappers/prisma-recipient-mapper.js";

interface makeRecipientProps extends Partial<RecipientProps> { }

export function makeRecipient(props?: makeRecipientProps) {
    const name = props?.name ?? faker.person.fullName();
    const phone = props?.phone ?? PhoneValueObject.create(fakeBRPhone());
    const accountId = props?.accountId ?? UniqueEntityId.rehydrate(randomUUID());
    const recipient = Recipient.create({
        accountId: accountId,
        name: name,
        phone,
    });

    return recipient;
}

@Injectable()
export class RecipientFactory {
    constructor(readonly prismaService: PrismaService) { }
    async makePrisma(props?: makeRecipientProps): Promise<Recipient> {
        const recipient = makeRecipient(props);
        const recipientToPersist = PrismaRecipientMapper.toPrisma(recipient);
        await this.prismaService.recipient.create({ data: recipientToPersist });
        return recipient
    }
}
