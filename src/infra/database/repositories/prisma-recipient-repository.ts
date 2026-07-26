import { RecipientRepository } from "@/domain/application/repositories/recipient-repository";
import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Recipient } from "@/domain/enterprise/entities/recipient";
import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/services/prisma.service";

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
    constructor(readonly prismaService: PrismaService) {

    }
    async create(recipient: Recipient): Promise<void> {
        const data = PrismaRecipientMapper.toPrisma(recipient);
        await this.prismaService.recipient.create({ data });
    }
    async findById(id: UniqueEntityId): Promise<Recipient | null> {
        const recipient = await this.prismaService.recipient.findUnique({ where: { id: id.toString() } });
        if (!recipient) return null;
        return PrismaRecipientMapper.toDomain(recipient);
    }
    async delete(id: UniqueEntityId): Promise<void> {
        const recipientId = id.toString();
        await this.prismaService.recipient.delete({ where: { id: recipientId } });
    }
    async update(recipient: Recipient): Promise<void> {
        const data = PrismaRecipientMapper.toPrisma(recipient);
        await this.prismaService.recipient.update({ where: { id: recipient.id.toString() }, data });
    }
}