import { beforeEach, describe, expect, it } from "vitest";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { makeRecipient } from "@/test/factory/make-recipient.js";
import { FetchDelivererDeliverUseCase } from "./fetch-deliverer-deliver.js";
import { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { makeDeliverer } from "@/test/factory/make-deliverer.js";

describe("FetchDelivererDeliverUseCase", () => {
    let deliverRepository: DeliverRepository
    let sut: FetchDelivererDeliverUseCase;
    let accountRepository: AccountRepository
    let delivererRepository: DelivererRepository
    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        delivererRepository = new DelivererRepositoryInMemory();
        sut = new FetchDelivererDeliverUseCase({
            repositories: {
                deliverRepository,
                accountRepository,
                delivererRepository
            },
        });
    });

    it("should fetch deliverer delivers", async () => {
        const account = makeAccount(
            {
                permissions: [PermissionType.DELIVERER_VIEW]
            }
        )
        const deliverer = makeDeliverer({
            accountId: account.id
        })
        const recipient = makeRecipient()

        const deliverPromises = Array.from({ length: 8 }, () => {
            const deliver = makeDeliver({
                recipientId: recipient.id,
                delivererId: deliverer.id
            })
            return deliverRepository.create(deliver);
        })


        await delivererRepository.create(deliverer);
        await accountRepository.create(account);
        await Promise.all(deliverPromises)

        const response = await sut.execute({
            actorId: deliverer.id.toString(),

        });

        expect(response.delivers.length).toEqual(8)
    });
});