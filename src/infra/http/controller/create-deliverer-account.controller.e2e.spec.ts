import { CPFValueObject } from '@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object';
import { AppModule } from '@/infra/app.module';
import { PrismaAccountRepository } from '@/infra/database/repositories/prisma-account-repository';
import { HasherService } from '@/infra/services/hasher.service';
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

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory, HasherService]
        }).compile();

        app = moduleRef.createNestApplication();

        prismaAccountRepository = app.get(PrismaAccountRepository)
        accountFactory = app.get(AccountFactory)
        jwtService = app.get(JwtService)
        await app.init();
    });

    test('[POST] /deliverer', async () => {
        const agent = request(app.getHttpServer())
        const delivererCpf = '52998224725'
        const delivererCpfValueObject = CPFValueObject.rehydrate(delivererCpf)
        const actorAccount = await accountFactory.makePrisma()

        const token = jwtService.sign({
            sub: actorAccount.id.toString(),
            permissions: actorAccount.permissions
        })



        const response = await agent.post('/deliverer').send({
            name: 'John Doe',
            phone: '+5511999999999',
            cpf: delivererCpf,
            password: '123456',
        }).set({
            Authorization: `Bearer ${token}`
        })

        const delivererPersisted = await prismaAccountRepository.findByCpf(delivererCpfValueObject)

        expect(delivererPersisted).toBeTruthy()


        expect(response.statusCode).toBe(201)
    });
});
