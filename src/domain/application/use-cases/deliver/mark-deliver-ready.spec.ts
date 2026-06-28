
import { beforeEach, describe, expect, it } from "vitest";
import { makeDelivery } from "@/test/factory/make-delivery.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { DeliverStatus } from "@/domain/enterprise/entities/deliver.js";
import { MarkDeliverReturnedUseCase } from "./mark-deliver-returned.js";

describe("mark deliver ready use case ", () => {
    let deliverRepository: DeliverRepository;
    let delivererRepository: DelivererRepository;
    let accountRepository: AccountRepository
    let sut: MarkDeliverReturnedUseCase;

    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        delivererRepository = new DelivererRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();

        sut = new MarkDeliverReturnedUseCase({
            repositories: {
                deliverRepository: deliverRepository,
                delivererRepository: delivererRepository,
                accountRepository: accountRepository
            },
        });
    });

    it("should update deliver as ready ", async () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliver
        })
        const deliverer = makeDelivery({
            accountId: account.id
        });
        const deliver = makeDeliver({
            delivererId: deliverer.id
        });
        await delivererRepository.create(deliverer);
        await deliverRepository.create(deliver);
        await accountRepository.create(account);

        const response = await sut.execute({
            deliverId: deliver.id.toString(),
            delivererId: deliverer.id.toString(),

        });

        expect(response.deliver.status).toEqual(DeliverStatus.RETURNED)


    });

    it("should update deliver as ready on database", async () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliver
        })
        const deliverer = makeDelivery({
            accountId: account.id
        });
        const deliver = makeDeliver({
            delivererId: deliverer.id
        });
        await delivererRepository.create(deliverer);
        await deliverRepository.create(deliver);
        await accountRepository.create(account);

        const response = await sut.execute({
            deliverId: deliver.id.toString(),
            delivererId: deliverer.id.toString(),

        });

        const deliverOnDb = await deliverRepository.findById(response.deliver.id)
        expect(deliverOnDb).toBeTruthy()
        expect(deliverOnDb?.status).toEqual(DeliverStatus.RETURNED)

    })

});

