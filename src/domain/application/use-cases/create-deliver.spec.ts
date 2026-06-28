import { beforeEach, describe, expect, it } from "vitest";
import { makeDelivery } from "@/test/factory/make-delivery.js";
import { makeRecipient } from "@/test/factory/make-recipient.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { RecipientRepositoryInMemory } from "@/test/repositories/recipient-repository-in-memory.js";
import type { DeliverRepository } from "../repositories/deliver-repository.js";
import type { DelivererRepository } from "../repositories/deliverer-repository.js";
import { CreateDeliverUseCase } from "./create-deliver.js";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { RecipientRepository } from "../repositories/recipient-repository.js";
import { AccountRepository } from "../repositories/account-repository.js";
import { makeAccount } from "@/test/factory/make-account.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";

describe("create Deliver use case ", () => {
    let deliverRepository: DeliverRepository;
    let delivererRepository: DelivererRepository;
    let recipientRepository: RecipientRepository;
    let accountRepository: AccountRepository
    let sut: CreateDeliverUseCase;

    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        delivererRepository = new DelivererRepositoryInMemory();
        recipientRepository = new RecipientRepositoryInMemory();
        accountRepository = new AccountRepositoryInMemory();

        sut = new CreateDeliverUseCase({
            repositories: {
                deliverRepository: deliverRepository,
                delivererRepository: delivererRepository,
                recipientRepository: recipientRepository,
                accountRepository: accountRepository
            },
        });
    });

    it("should create a delivery ", async () => {
        const deliverer = makeDelivery();
        const recipient = makeRecipient();
        const account = makeAccount({
            permissions: PermissionPresets.admin
        })
        await delivererRepository.create(deliverer);
        await recipientRepository.create(recipient);
        await accountRepository.create(account);

        const response = await sut.execute({
            actorId: account.id.toString(),
            address: "new street",
            delivererId: deliverer.id.toString(),
            recipientId: recipient.id.toString(),
        });

        expect(response.deliver.deliveryId).toEqual(deliverer.id)
        expect(response.deliver.recipientId).toEqual(recipient.id)
    });

    it("should create a delivery  and persist ", async () => {
        const deliverer = makeDelivery();
        const recipient = makeRecipient();
        const account = makeAccount({
            permissions: PermissionPresets.admin
        })
        await delivererRepository.create(deliverer);
        await recipientRepository.create(recipient);
        await accountRepository.create(account);

        const response = await sut.execute({
            actorId: account.id.toString(),
            address: "new street",
            delivererId: deliverer.id.toString(),
            recipientId: recipient.id.toString(),
        });
        const deliverOnDb = await deliverRepository.findById(response.deliver.id)
        expect(deliverOnDb).toBeTruthy()
    })
});
