import { beforeEach, describe, expect, it } from "vitest";
import { RecipientRepositoryInMemory } from "@/test/repositories/recipient-repository-in-memory.js";
import { CreateRecipientUseCase } from "./create-recipient.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { AccountRepository } from "../repositories/account-repository.js";
import { RecipientRepository } from "../repositories/recipient-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";



describe("CreateRecipientUseCase", () => {
    let recipientRepository: RecipientRepository
    let sut: CreateRecipientUseCase;
    let accountRepository: AccountRepository
    beforeEach(() => {
        recipientRepository = new RecipientRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new CreateRecipientUseCase({
            repositories: {
                recipientRepository,
                accountRepository
            },
        });
    });

    it("should create and persist a recipient", async () => {
        const account = makeAccount()

        await accountRepository.create(account);


        const { recipient } = await sut.execute({
            actorId: account.id.toString(),
            address: "Rua das Flores, 123",
            name: "João Silva",
            phone: "+5511987654321",
        });

        const persistedRecipient = await recipientRepository.findById(
            recipient.id
        );

        expect(persistedRecipient).toEqual(recipient);
    });
});