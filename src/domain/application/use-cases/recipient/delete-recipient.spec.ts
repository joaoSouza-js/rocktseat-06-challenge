import { beforeEach, describe, expect, it } from "vitest";
import { RecipientRepositoryInMemory } from "@/test/repositories/recipient-repository-in-memory.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { RecipientRepository } from "../../repositories/recipient-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { DeleteRecipientUseCase } from "./delete-recipient.js";
import { makeRecipient } from "@/test/factory/make-recipient.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";

describe("DeleteRecipientUseCase", () => {
    let recipientRepository: RecipientRepository
    let sut: DeleteRecipientUseCase;
    let accountRepository: AccountRepository
    beforeEach(() => {
        recipientRepository = new RecipientRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new DeleteRecipientUseCase({
            repositories: {
                recipientRepository,
                accountRepository
            },
        });
    });

    it("should delete a recipient on database", async () => {
        const account = makeAccount(
            {
                permissions: [PermissionType.RECIPIENT_DELETE]
            }
        )
        const recipient = makeRecipient()
        await accountRepository.create(account);
        await recipientRepository.create(recipient);

        await sut.execute({
            actorId: account.id.toString(),
            recipientId: recipient.id.toString(),
        });

        const recipientOnDatabase = await recipientRepository.findById(
            recipient.id
        );

        expect(recipientOnDatabase).toBeNull();
    });
});