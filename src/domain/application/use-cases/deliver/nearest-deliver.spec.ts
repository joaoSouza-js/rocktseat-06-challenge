import { beforeEach, describe, expect, it } from "vitest";
import { makeDeliverer } from "@/test/factory/make-deliverer.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { NearestDeliverUseCase } from "./nearest-deliver.js";

describe("nearest deliver use case", () => {
    let deliverRepository: DeliverRepository;
    let delivererRepository: DelivererRepository;
    let accountRepository: AccountRepository;
    let sut: NearestDeliverUseCase;

    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        delivererRepository = new DelivererRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();
        sut = new NearestDeliverUseCase({
            repositories: {
                deliverRepository: deliverRepository,
                delivererRepository: delivererRepository,
                accountRepository: accountRepository,

            },
        });
    });

    it("should return nearest deliver", async () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliver
        })
        const deliverer = makeDeliverer({
            accountId: account.id
        });
        const deliver = makeDeliver({
            delivererId: deliverer.id
        });
        await accountRepository.create(account);
        await delivererRepository.create(deliverer);
        await deliverRepository.create(deliver);

        const response = await sut.execute({
            latitude: -23.55,
            longitude: -46.55,
            actorId: deliverer.id.toString(),

        });
        expect(response.delivers).toHaveLength(1)
    });
});