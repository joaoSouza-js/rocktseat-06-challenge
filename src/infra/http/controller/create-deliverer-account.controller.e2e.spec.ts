import { AppModule } from '@/infra/app.module';
import { PrismaAccountRepository } from '@/infra/database/repositories/prisma-account-repository';
import { ApiConfigService } from '@/infra/services/api-config.service';
import { AccountFactory } from '@/test/factory/make-account';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Create deliver account controller (e2e)', () => {

    let app: INestApplication;
    let jwtService: JwtService
    let prismaAccountRepository: PrismaAccountRepository
    let accountFactory: AccountFactory
    let apiConfigService: ApiConfigService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory]
        }).compile();

        app = moduleRef.createNestApplication();

        prismaAccountRepository = app.get(PrismaAccountRepository)
        accountFactory = app.get(AccountFactory)
        apiConfigService = app.get(ApiConfigService)
        jwtService = app.get(JwtService)
        await app.init();
    });

    test('[POST] /deliverer', async () => {
        const agent = request(app.getHttpServer())
        const cpf = '52998224725'

        const actorAccount = await accountFactory.makePrisma()

        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })

        const response = await agent.post('/deliverer').send({
            name: 'John Doe',
            phone: '+5511999999999',
            cpf: cpf,
            password: '123456',
        }).set({
            Authorization: `Bearer ${token}`
        })

        console.log(response.body)

        expect(response.statusCode).toBe(201)
    });
});
