import { beforeEach, describe, expect, it } from "vitest";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { DeleteDelivererUseCase } from "./delete-deliverer.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { makeDelivery } from "@/test/factory/make-delivery.js";

describe("DeleteDelivererUseCase", () => {
    let delivererRepository: DelivererRepository
    let sut: DeleteDelivererUseCase;
    let accountRepository: AccountRepository
    beforeEach(() => {
        delivererRepository = new DelivererRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new DeleteDelivererUseCase({
            repositories: {
                delivererRepository,
                accountRepository
            },
        });
    });

    it("should delete a deliverer on database", async () => {
        const account = makeAccount(
            {
                permissions: [PermissionType.DELIVERER_DELETE]
            }
        )
        const deliverer = makeDelivery()
        await accountRepository.create(account);
        await delivererRepository.create(deliverer);

        await sut.execute({
            actorId: account.id.toString(),
            delivererId: deliverer.id.toString(),
        });

        const delivererOnDatabase = await delivererRepository.findById(
            deliverer.id
        );

        expect(delivererOnDatabase).toBeNull();
    });
});