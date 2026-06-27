import { beforeEach, describe, expect, it } from "vitest";
import { RecipientRepositoryInMemory } from "@/test/repositories/recipient-repository-in-memory.js";
import { CreateRecipientUseCase } from "./create-recipient.js";

let recipientRepository: RecipientRepositoryInMemory;
let sut: CreateRecipientUseCase;

describe("CreateRecipientUseCase", () => {
    beforeEach(() => {
        recipientRepository = new RecipientRepositoryInMemory();

        sut = new CreateRecipientUseCase({
            repositories: {
                recipientRepository,
            },
        });
    });

    it("should create and persist a recipient", async () => {
        const { recipient } = await sut.execute({
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