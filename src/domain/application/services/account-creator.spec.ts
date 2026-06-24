import { beforeEach, describe, expect, it } from "vitest";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permisions-preset.js";
import { ResourceAlreadyExist } from "@/domain/error/resource-already-exist.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { FakeHasher } from "@/test/services/fake-hasher.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "../services/hasher-generator.js";
import {
    AccountCreatorService,
    type AccountCreatorServiceRequest,
} from "./account-creator.js";

describe("create account service ", () => {
    let accountRepository: AccountRepository;
    let hasherGenerator: HasherGenerator;
    let sut: AccountCreatorService;

    beforeEach(() => {
        accountRepository = new AccountRepositoryInMemory();
        hasherGenerator = new FakeHasher();
        sut = new AccountCreatorService(accountRepository, hasherGenerator);
    });

    it("should create account ", async () => {
        const input: AccountCreatorServiceRequest = {
            user: {
                cpf: "529.982.247-25",
                name: "pedro",
                password: "123456",
            },
            permissions: PermissionPresets.user,
        };
        const account = await sut.create(input);

        expect(account.id).toBeDefined();
    });

    it("should persist account on database", async () => {
        const input: AccountCreatorServiceRequest = {
            user: {
                cpf: "529.982.247-25",
                name: "pedro",
                password: "123456",
            },
            permissions: PermissionPresets.user,
        };
        const account = await sut.create(input);

        const findAccountOnDatabase = await accountRepository.findById(account.id);

        expect(findAccountOnDatabase).toBeDefined();
        expect(findAccountOnDatabase?.id).toBe(account.id);
    });

    it("should not  be able to create a account with same cpf", async () => {
        const input: AccountCreatorServiceRequest = {
            user: {
                cpf: "529.982.247-25",
                name: "pedro",
                password: "123456",
            },
            permissions: PermissionPresets.user,
        };
        await sut.create(input);
        expect(sut.create(input)).rejects.toBeInstanceOf(ResourceAlreadyExist);
    });
});
