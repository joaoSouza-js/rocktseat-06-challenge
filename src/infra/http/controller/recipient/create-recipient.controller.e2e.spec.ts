import { AppModule } from '@/infra/app.module';
import { PrismaRecipientRepository } from '@/infra/database/repositories/prisma-recipient-repository';
import { AccountFactory } from '@/test/factory/make-account';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Create deliver account controller (e2e)', () => {

    let app: INestApplication;
    let jwtService: JwtService
    let prismaRecipientRepository: PrismaRecipientRepository
    let accountFactory: AccountFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory]
        }).compile();

        app = moduleRef.createNestApplication();


        accountFactory = app.get(AccountFactory)
        jwtService = app.get(JwtService)
        prismaRecipientRepository = app.get(PrismaRecipientRepository)
        await app.init();
    });

    test('[POST] /recipient', async () => {
        const agent = request(app.getHttpServer())
        const actorAccount = await accountFactory.makePrisma()

        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })

        const response = await agent.post('/recipient').send({
            name: 'John Doe',
            phone: '+5511999999999',
        }).set({
            Authorization: `Bearer ${token}`
        })
        expect(response.statusCode).toBe(201)

        const recipientPersisted = await prismaRecipientRepository.findById(response.body.recipient.id)
        expect(recipientPersisted).toBeTruthy()

    });
});
