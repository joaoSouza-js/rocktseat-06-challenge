import { CPFValueObject } from '@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object';
import { AppModule } from '@/infra/app.module';
import { PrismaAccountRepository } from '@/infra/database/repositories/prisma-account-repository';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

describe('Create account controller (e2e)', () => {

    let app: INestApplication;

    let prismaAccountRepository: PrismaAccountRepository
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();

        prismaAccountRepository = app.get(PrismaAccountRepository)
        await app.init();
    });

    test('[POST] /accounts', async () => {
        const agent = request(app.getHttpServer())
        const cpf = '52998224725'

        const response = await agent.post('/accounts').send({
            name: 'John Doe',
            phone: '+5511999999999',
            cpf: cpf,
            password: '123456',
        })

        expect(response.statusCode).toBe(201)

        const accountCpf = CPFValueObject.create(cpf)
        const account = await prismaAccountRepository.findByCpf(accountCpf)

        expect(account).toBeTruthy()
    });
});
