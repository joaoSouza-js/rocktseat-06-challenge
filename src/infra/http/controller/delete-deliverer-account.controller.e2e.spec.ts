import { PermissionType } from '@/domain/enterprise/entities/account/enums/permissions-type';
import { AppModule } from '@/infra/app.module';
import { PrismaAccountRepository } from '@/infra/database/repositories/prisma-account-repository';
import { AccountFactory } from '@/test/factory/make-account';
import { DelivererFactory } from '@/test/factory/make-deliverer';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

describe('delete deliver account controller (e2e)', () => {

    let app: INestApplication;
    let jwtService: JwtService
    let prismaAccountRepository: PrismaAccountRepository
    let accountFactory: AccountFactory
    let delivererFactory: DelivererFactory

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory, DelivererFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prismaAccountRepository = app.get(PrismaAccountRepository)
        accountFactory = app.get(AccountFactory)
        jwtService = app.get(JwtService)
        delivererFactory = app.get(DelivererFactory)
        await app.init();
    });

    test('[DELETE] /deliverer/:id', async () => {
        const agent = request(app.getHttpServer())

        const actorAccount = await accountFactory.makePrisma({
            permissions: [PermissionType.DELIVERER_DELETE]
        })

        const delivererAccount = await accountFactory.makePrisma({})

        const deliverer = await delivererFactory.makePrisma({
            accountId: delivererAccount.id
        })


        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })

        const response = await agent.delete(`/deliverer/${deliverer.id.toString()}`).send().set({
            Authorization: `Bearer ${token}`
        })

        expect(response.statusCode).toBe(204)

        const delivererPersisted = await prismaAccountRepository.findById(deliverer.id)
        expect(delivererPersisted).toBeNull()

    });
});
