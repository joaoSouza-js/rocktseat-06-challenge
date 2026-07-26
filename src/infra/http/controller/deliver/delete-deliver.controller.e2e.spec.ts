import { PermissionType } from '@/domain/enterprise/entities/account/enums/permissions-type';
import { AppModule } from '@/infra/app.module';
import { PrismaDeliverRepository } from '@/infra/database/repositories/prisma-deliver-repository';
import { AccountFactory } from '@/test/factory/make-account';
import { DeliverFactory } from '@/test/factory/make-deliver';
import { RecipientFactory } from '@/test/factory/make-recipient';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Create deliver (e2e)', () => {

    let app: INestApplication;
    let jwtService: JwtService
    let prismaDeliverRepository: PrismaDeliverRepository
    let accountFactory: AccountFactory
    let recipientFactory: RecipientFactory
    let deliverFactory: DeliverFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory, RecipientFactory, DeliverFactory]
        }).compile();

        app = moduleRef.createNestApplication();


        accountFactory = app.get(AccountFactory)
        jwtService = app.get(JwtService)
        prismaDeliverRepository = app.get(PrismaDeliverRepository)
        recipientFactory = app.get(RecipientFactory)
        deliverFactory = app.get(DeliverFactory)
        await app.init();
    });

    test('[DELETE] /deliver/:id', async () => {
        const agent = request(app.getHttpServer())
        const actorAccount = await accountFactory.makePrisma({
            permissions: [PermissionType.DELIVER_DELETE]
        })
        const recipient = await recipientFactory.makePrisma()
        const deliverer = await deliverFactory.makePrisma({ recipientId: recipient.id })

        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })

        const response = await agent.delete(`/deliver/${deliverer.id.toString()}`).send().set({
            Authorization: `Bearer ${token}`
        })

        expect(response.statusCode).toBe(204)

        const deliverPersisted = await prismaDeliverRepository.findById(deliverer.id)
        expect(deliverPersisted).toBeNull()

    });
});
