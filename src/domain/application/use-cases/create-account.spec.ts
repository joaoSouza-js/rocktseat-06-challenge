import { beforeEach, describe, expect, it } from "vitest";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { FakeHasher } from "@/test/services/fake-hasher.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "../services/hasher-generator.js";
import {
    CreateAccountUseCase,
    type CreateAccountUseCaseInput,
} from "./create-account.js";

describe("create account use case", () => {
    let accountRepository: AccountRepository;
    let hasherGenerator: HasherGenerator;
    let sut: CreateAccountUseCase;

    beforeEach(() => {
        accountRepository = new AccountRepositoryInMemory();
        hasherGenerator = new FakeHasher();

        sut = new CreateAccountUseCase({
            repositories: {
                accountRepository,
            },
            services: {
                hasherGenerator,
            },
        });
    });

    it("should create an account with user permissions", async () => {
        const input: CreateAccountUseCaseInput = {
            cpf: "529.982.247-25",
            password: "123456",
            name: "Pedro",
            phone: "+5511987654321",

        };

        const account = await sut.execute(input);

        expect(account.permissions).toEqual(PermissionPresets.user);
    });
});
