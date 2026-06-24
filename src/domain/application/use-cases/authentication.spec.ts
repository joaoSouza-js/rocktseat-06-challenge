import { beforeEach, describe, expect, it } from "vitest";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { FakeHasher } from "@/test/services/fake-hasher.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherGenerator } from "../services/hasher-generator.js";
import type { HasherVerify } from "../services/hasher-verify.js";
import { AuthenticationUseCase } from "./authentication.js";

describe("authentication use case ", () => {
    let accountRepository: AccountRepository;
    let hasherVerify: HasherVerify;
    let hasherGenerator: HasherGenerator;
    let sut: AuthenticationUseCase;

    beforeEach(() => {
        accountRepository = new AccountRepositoryInMemory();
        hasherGenerator = FakeHasher.instance;
        hasherVerify = FakeHasher.instance;

        sut = new AuthenticationUseCase({
            repositories: {
                accountRepository: accountRepository,
            },
            services: {
                hasherVerify: hasherVerify,
            },
        });
    });

    it("should authenticate ", async () => {
        const password = "password";
        const passwordHash = hasherGenerator.generate(password);
        const account = makeAccount({
            passwordHash: passwordHash,
        });
        accountRepository.create(account);

        const response = await sut.execute({
            cpf: account.cpf.cpf,
            password: password,
        });

        expect(response.account.cpf).equal(account.cpf);
    });

    it("should throw when account does not exist", async () => {
        const password = "password";
        const passwordHash = hasherGenerator.generate(password);
        const account = makeAccount({
            passwordHash: passwordHash,
        });

        await expect(
            sut.execute({
                cpf: account.cpf.cpf,
                password: passwordHash,
            }),
        ).rejects.toThrow(CredentialsInvalid);
    });

    it("should throw when password is invalid", async () => {
        const password = "password";
        const passwordHash = hasherGenerator.generate(password);

        const account = makeAccount({
            passwordHash,
        });

        await accountRepository.create(account);

        await expect(
            sut.execute({
                cpf: account.cpf.cpf,
                password: "wrong-password",
            }),
        ).rejects.toThrow(CredentialsInvalid);
    });
});
