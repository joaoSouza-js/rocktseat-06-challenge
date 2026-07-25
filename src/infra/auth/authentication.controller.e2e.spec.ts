import { AppModule } from '@/infra/app.module';
import { AccountFactory } from '@/test/factory/make-account';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';
import { HasherService } from '../services/hasher.service';

describe('authentication controller (e2e)', () => {

    let app: INestApplication;
    let accountFactory: AccountFactory
    let hasherService: HasherService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AccountFactory, HasherService]
        }).compile();

        app = moduleRef.createNestApplication();

        accountFactory = app.get(AccountFactory)
        hasherService = app.get(HasherService)
        await app.init();
    });

    test('[POST] /authentication', async () => {
        const agent = request(app.getHttpServer())

        const password = "123456";
        const passwordHash = await hasherService.generate(password);

        const account = await accountFactory.makePrisma({
            name: "John Doe",
            passwordHash: passwordHash

        })

        const response = await agent.post('/authentication').send({
            cpf: account.cpf.cpf,
            password: password
        })

        expect(response.body).toHaveProperty("token")
        expect(response.statusCode).toBe(200)
    });
});
