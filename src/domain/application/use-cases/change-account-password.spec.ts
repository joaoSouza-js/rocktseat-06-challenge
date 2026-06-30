import { beforeEach, describe, expect, it } from "vitest";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { FakeHasher } from "@/test/services/fake-hasher.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "../services/hasher-generator.js";
import { ChangeAccountPasswordUseCase } from "./change-account-password.js";
import { makeAccount } from "@/test/factory/make-account.js";

describe("change account password use case", () => {
    let accountRepository: AccountRepository;
    let hasherGenerator: HasherGenerator;
    let sut: ChangeAccountPasswordUseCase;

    beforeEach(() => {
        accountRepository = new AccountRepositoryInMemory();
        hasherGenerator = new FakeHasher();

        sut = new ChangeAccountPasswordUseCase({
            repositories: {
                accountRepository,
            },
            services: {
                hasherGenerator,
            },
        });
    });

    it("should update account password and persist on database", async () => {
        const actorAccount = makeAccount({ permissions: PermissionPresets.admin });
        const account = makeAccount({ permissions: PermissionPresets.user });
        const newPassword = "123456";

        await accountRepository.create(actorAccount);
        await accountRepository.create(account);

        await sut.execute({
            actorId: actorAccount.id.toString(),
            accountId: account.id.toString(),
            password: newPassword,
        });

        const accountPasswordChanged = hasherGenerator.generate(newPassword)

        const accountOnDb = await accountRepository.findById(account.id);
        expect(accountOnDb).toBeTruthy();
        expect(accountOnDb?.passwordHashed).toEqual(accountPasswordChanged);
    });


});