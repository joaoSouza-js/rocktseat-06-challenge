import { PermissionType } from '@/domain/enterprise/entities/account/enums/permissions-type';
import { AppModule } from '@/infra/app.module';
import { PrismaRecipientRepository } from '@/infra/database/repositories/prisma-recipient-repository';
import { AccountFactory } from '@/test/factory/make-account';
import { RecipientFactory } from '@/test/factory/make-recipient';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Delete deliver account controller (e2e)', () => {

    let app: INestApplication;
    let jwtService: JwtService
    let prismaRecipientRepository: PrismaRecipientRepository
    let accountFactory: AccountFactory
    let recipientFactory: RecipientFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory, RecipientFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        accountFactory = app.get(AccountFactory)
        jwtService = app.get(JwtService)
        prismaRecipientRepository = app.get(PrismaRecipientRepository)
        recipientFactory = app.get(RecipientFactory)
        await app.init();
    });

    test('[DELETE] /recipient:id', async () => {
        const agent = request(app.getHttpServer())
        const actorAccount = await accountFactory.makePrisma({
            permissions: [PermissionType.RECIPIENT_DELETE]
        })
        const recipient = await recipientFactory.makePrisma()

        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })

        const response = await agent.delete(`/recipient/${recipient.id.toString()}`).send().set({
            Authorization: `Bearer ${token}`
        })


        expect(response.statusCode).toBe(204)

        const recipientPersisted = await prismaRecipientRepository.findById(recipient.id)
        expect(recipientPersisted).toBeNull()

    });
});
