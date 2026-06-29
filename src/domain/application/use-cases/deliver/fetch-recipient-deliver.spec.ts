import { beforeEach, describe, expect, it } from "vitest";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { FetchRecipientDeliverDeliverUseCase } from "./fetch-recipient-deliver.js";
import { makeRecipient } from "@/test/factory/make-recipient.js";

describe("FetchRecipientDeliverDeliverUseCase", () => {
    let deliverRepository: DeliverRepository
    let sut: FetchRecipientDeliverDeliverUseCase;
    let accountRepository: AccountRepository
    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new FetchRecipientDeliverDeliverUseCase({
            repositories: {
                deliverRepository,
                accountRepository
            },
        });
    });

    it("should fetch recipient delivers", async () => {
        const account = makeAccount(
            {
                permissions: [PermissionType.DELIVERER_VIEW]
            }
        )
        const recipient = makeRecipient()

        const deliverPromises = Array.from({ length: 8 }, () => {
            const deliver = makeDeliver({
                recipientId: recipient.id
            })
            return deliverRepository.create(deliver);
        })


        await accountRepository.create(account);
        await Promise.all(deliverPromises)

        const response = await sut.execute({
            actorId: account.id.toString(),
            recipientId: recipient.id.toString(),
        });

        expect(response.delivers.length).toEqual(8)
    });
});