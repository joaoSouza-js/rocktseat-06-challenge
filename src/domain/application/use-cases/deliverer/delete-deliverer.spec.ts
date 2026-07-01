import { beforeEach, describe, expect, it } from "vitest";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { makeDeliverer } from "@/test/factory/make-deliverer.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import type { AccountRepository } from "../../repositories/account-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { DeleteDelivererUseCase } from "./delete-deliverer.js";

describe("DeleteDelivererUseCase", () => {
    let delivererRepository: DelivererRepository;
    let sut: DeleteDelivererUseCase;
    let accountRepository: AccountRepository;
    beforeEach(() => {
        delivererRepository = new DelivererRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new DeleteDelivererUseCase({
            repositories: {
                delivererRepository,
                accountRepository,
            },
        });
    });

    it("should delete a deliverer on database", async () => {
        const account = makeAccount({
            permissions: [PermissionType.DELIVERER_DELETE],
        });
        const deliverer = makeDeliverer();
        await accountRepository.create(account);
        await delivererRepository.create(deliverer);

        await sut.execute({
            actorId: account.id.toString(),
            delivererId: deliverer.id.toString(),
        });

        const delivererOnDatabase = await delivererRepository.findById(
            deliverer.id,
        );

        expect(delivererOnDatabase).toBeNull();
    });
});
