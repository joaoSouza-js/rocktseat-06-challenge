import { AppModule } from '@/infra/app.module';
import { PrismaDeliverRepository } from '@/infra/database/repositories/prisma-deliver-repository';
import { AccountFactory } from '@/test/factory/make-account';
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
    let prismaDelivererRepository: PrismaDeliverRepository

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory, RecipientFactory]
        }).compile();

        app = moduleRef.createNestApplication();


        accountFactory = app.get(AccountFactory)
        jwtService = app.get(JwtService)
        prismaDeliverRepository = app.get(PrismaDeliverRepository)
        recipientFactory = app.get(RecipientFactory)
        await app.init();
    });

    test('[POST] /deliver', async () => {
        const agent = request(app.getHttpServer())
        const actorAccount = await accountFactory.makePrisma()
        const recipient = await recipientFactory.makePrisma()
        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })

        const response = await agent.post('/deliver').send(
            {
                "name": "John Doe",
                "phone": "+5511999999999",
                "recipientId": recipient.id.toString(),
                "address": "Rua Example, 123, São Paulo",
                "latitude": -23.55052,
                "longitude": -46.633308
            }
        ).set({
            Authorization: `Bearer ${token}`
        })

        console.log(response.body);
        expect(response.statusCode).toBe(201)

        const deliverPersisted = await prismaDeliverRepository.findById(response.body.deliver.id)
        expect(deliverPersisted).toBeTruthy()

    });
});
