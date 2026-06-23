import { beforeEach, describe, expect, it } from "vitest";
import type { RoleType } from "@/domain/enterprise/entities/value-objects/account-role.js";
import { ResourceAlreadyExist } from "@/domain/error/resource-already-exist.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { FakeHasher } from "@/test/services/fake-hasher.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "../services/hasher-generator.js";
import {
    CreateAccountUseCase,
    type CreateAccountUseCaseInput,
} from "./create-account.js";

describe("create account use case ", () => {
    let accountRepository: AccountRepository;
    let hasherGenerator: HasherGenerator;
    let sut: CreateAccountUseCase;

    beforeEach(() => {
        accountRepository = new AccountRepositoryInMemory();
        hasherGenerator = new FakeHasher();
        sut = new CreateAccountUseCase({
            repositories: {
                accountRepository: accountRepository,
            },
            services: {
                hasherGenerator: hasherGenerator,
            },
        });
    });

    it("should a account ", async () => {
        const input: CreateAccountUseCaseInput = {
            cpf: "529.982.247-25",
            name: "pedro",
            password: "123456",
            role: "ADMIN" as RoleType,
        };
        const account = await sut.execute(input);

        expect(account.id).toBeDefined();
    });

    it("should persist account on database", async () => {
        const input: CreateAccountUseCaseInput = {
            cpf: "529.982.247-25",
            name: "pedro",
            password: "123456",
            role: "ADMIN" as RoleType,
        };
        const account = await sut.execute(input);

        const findAccountOnDatabase = await accountRepository.findById(account.id);

        expect(findAccountOnDatabase).toBeDefined();
        expect(findAccountOnDatabase?.id).toBe(account.id);
    });

    it("should not  be able to create a account with same cpf", async () => {
        const input: CreateAccountUseCaseInput = {
            cpf: "529.982.247-25",
            name: "pedro",
            password: "123456",
            role: "ADMIN" as RoleType,
        };
        await sut.execute(input);
        expect(sut.execute(input)).rejects.toBeInstanceOf(ResourceAlreadyExist);
    });
});
