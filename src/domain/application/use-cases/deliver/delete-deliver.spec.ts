import { beforeEach, describe, expect, it } from "vitest";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { DeleteDeliverUseCase } from "./delete-deliver.js";
import { PermissionType } from "@/domain/enterprise/entities/account/enums/permissions-type.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";

describe("DeleteDeliverUseCase", () => {
    let deliverRepository: DeliverRepository
    let sut: DeleteDeliverUseCase;
    let accountRepository: AccountRepository
    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new DeleteDeliverUseCase({
            repositories: {
                deliverRepository,
                accountRepository
            },
        });
    });

    it("should delete a deliver on database", async () => {
        const account = makeAccount(
            {
                permissions: [PermissionType.DELIVER_DELETE]
            }
        )
        const deliver = makeDeliver()
        await accountRepository.create(account);
        await deliverRepository.create(deliver);

        await sut.execute({
            actorId: account.id.toString(),
            deliverId: deliver.id.toString(),
        });

        const deliverOnDatabase = await deliverRepository.findById(
            deliver.id
        );

        expect(deliverOnDatabase).toBeNull();
    });
});