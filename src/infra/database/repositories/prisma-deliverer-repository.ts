import { DelivererRepository } from "@/domain/application/repositories/deliverer-repository";
import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity";
import { PrismaDelivererMapper } from "../mappers/prisma-deliverer-mapper";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/services/prisma.service";

@Injectable()
export class PrismaDelivererRepository implements DelivererRepository {
    constructor(readonly prismaService: PrismaService) { }
    async findByAccountId(accountId: UniqueEntityId): Promise<Deliverer | null> {
        const accountFound = await this.prismaService.deliverer.findUnique({
            where: {
                accountId: accountId.toString(),
            },
            include: { schedules: true },
        })

        if (accountFound === null) return null;

        const account = PrismaDelivererMapper.toDomain(accountFound);
        return account
    }

    async create(deliverer: Deliverer): Promise<void> {
        const delivererModel = PrismaDelivererMapper.toPrisma(deliverer);
        await this.prismaService.deliverer.create({ data: delivererModel });
    }
    async findById(id: UniqueEntityId): Promise<Deliverer | null> {
        const delivererId = id.toString();
        const delivererFound = await this.prismaService.deliverer.findUnique({
            where: { id: delivererId },
            include: { schedules: true },
        });
        if (delivererFound === null) return null;

        const deliverer = delivererFound
            ? PrismaDelivererMapper.toDomain(delivererFound)
            : null;
        return deliverer;
    }
    async delete(id: UniqueEntityId): Promise<void> {
        const delivererId = id.toString();
        await this.prismaService.deliverer.delete({
            where: { id: delivererId },
        });
    }
    async update(deliverer: Deliverer): Promise<void> {
        const delivererModel = PrismaDelivererMapper.toPrisma(deliverer);
        await this.prismaService.deliverer.update({
            where: { id: deliverer.id.toString() },
            data: delivererModel,
        });
    }
}
