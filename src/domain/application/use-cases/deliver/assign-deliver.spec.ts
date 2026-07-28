import { beforeEach, describe, expect, it } from "vitest";
import { makeAccount } from "@/test/factory/make-account.js";
import { makeDeliver } from "@/test/factory/make-deliver.js";
import { makeDeliverer } from "@/test/factory/make-deliverer.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { AssignDeliverUseCase } from "./assign-deliver.js";
import { DeliverRepository } from "../../repositories/deliver-repository.js";
import { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountRepository } from "../../repositories/account-repository.js";
import { DeliverStatus } from "@/domain/enterprise/entities/deliver.js";

describe("assign Deliver use case", () => {
    let deliverRepository: DeliverRepository;
    let delivererRepository: DelivererRepository;
    let accountRepository: AccountRepository;

    let sut: AssignDeliverUseCase;

    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        delivererRepository = new DelivererRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();

        sut = new AssignDeliverUseCase({
            repositories: {
                deliverRepository,
                delivererRepository,
                accountRepository,
            },
        });
    });

    it("should assign a deliverer to a deliver", async () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliverer,
        });

        const deliverer = makeDeliverer({
            accountId: account.id,
        });

        const deliver = makeDeliver();

        await accountRepository.create(account);
        await delivererRepository.create(deliverer);
        await deliverRepository.create(deliver);

        await sut.execute({
            actorId: account.id.toString(),
            deliverId: deliver.id.toString(),
        });

        const deliverOnDb = await deliverRepository.findById(deliver.id);

        expect(deliverOnDb?.deliveryId).toEqual(deliverer.id);
    });

    it("should persist the assignment", async () => {
        const account = makeAccount({
            permissions: PermissionPresets.deliverer,
        });

        const deliverer = makeDeliverer({
            accountId: account.id,
        });

        const deliver = makeDeliver();

        await accountRepository.create(account);
        await delivererRepository.create(deliverer);
        await deliverRepository.create(deliver);

        await sut.execute({
            actorId: account.id.toString(),
            deliverId: deliver.id.toString(),
        });

        const persistedDeliver = await deliverRepository.findById(deliver.id);

        expect(persistedDeliver?.deliveryId).toEqual(deliverer.id);
        expect(persistedDeliver?.status).toBe(DeliverStatus.PROGRESS);
    });
});