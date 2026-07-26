import { DeliverRepository } from "@/domain/application/repositories/deliver-repository";
import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Deliver } from "@/domain/enterprise/entities/deliver";
import { PrismaDeliverMapper } from "../mappers/prisma-deliver-mapper";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/services/prisma.service";
import { LocationValueObject } from "@/domain/enterprise/entities/value-objects/location";

@Injectable()
export class PrismaDeliverRepository implements DeliverRepository {
    constructor(readonly prismaService: PrismaService) {

    }
    async fetchByRecipientId(recipientId: UniqueEntityId): Promise<Deliver[]> {
        const deliversFound = await this.prismaService.deliver.findMany({ where: { recipientId: recipientId.toString() } });
        const delivers = deliversFound.map((deliver) => PrismaDeliverMapper.toDomain(deliver));
        return delivers
    }
    async fetchByDelivererId(delivererId: UniqueEntityId): Promise<Deliver[]> {
        const deliversFound = await this.prismaService.deliver.findMany({ where: { recipientId: delivererId.toString() } });
        const delivers = deliversFound.map((deliver) => PrismaDeliverMapper.toDomain(deliver));
        return delivers
    }
    fetchNearestDeliver(location: LocationValueObject, delivererId?: UniqueEntityId): Promise<Deliver[]> {
        throw new Error("Method not implemented.");
    }
    async create(deliver: Deliver): Promise<void> {
        const data = PrismaDeliverMapper.toPrisma(deliver);
        await this.prismaService.deliver.create({ data });
    }
    async findById(id: UniqueEntityId): Promise<Deliver | null> {
        const deliver = await this.prismaService.deliver.findUnique({ where: { id: id.toString() } });
        if (!deliver) return null;
        return PrismaDeliverMapper.toDomain(deliver);
    }
    async delete(id: UniqueEntityId): Promise<void> {
        const deliverId = id.toString();
        await this.prismaService.deliver.delete({ where: { id: deliverId } });
    }
    async update(deliver: Deliver): Promise<void> {
        const data = PrismaDeliverMapper.toPrisma(deliver);
        await this.prismaService.deliver.update({ where: { id: deliver.id.toString() }, data });
    }
}