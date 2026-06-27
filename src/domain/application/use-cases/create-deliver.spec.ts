import { beforeEach, describe, expect, it } from "vitest";
import { makeDelivery } from "@/test/factory/make-delivery.js";
import { makeRecipient } from "@/test/factory/make-recipient.js";
import { DeliverRepositoryInMemory } from "@/test/repositories/deliver.repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { RecipientRepositoryInMemory } from "@/test/repositories/recipient-repository-in-memory.js";
import type { DeliverRepository } from "../repositories/deliver-repository.js";
import type { DelivererRepository } from "../repositories/deliverer-repository.js";
import { CreateDeliverUseCase } from "./create-deliver.js";

describe("create Deliver use case ", () => {
    let deliverRepository: DeliverRepository;
    let delivererRepository: DelivererRepository;
    let recipientRepository: RecipientRepositoryInMemory;

    let sut: CreateDeliverUseCase;

    beforeEach(() => {
        deliverRepository = new DeliverRepositoryInMemory();
        delivererRepository = new DelivererRepositoryInMemory();
        recipientRepository = new RecipientRepositoryInMemory();

        sut = new CreateDeliverUseCase({
            repositories: {
                deliverRepository: deliverRepository,
                delivererRepository: delivererRepository,
                recipientRepository: recipientRepository,
            },
        });
    });

    it("should create a delivery ", async () => {
        const deliverer = makeDelivery();
        const recipient = makeRecipient();
        await delivererRepository.create(deliverer);
        await recipientRepository.create(recipient);

        const response = await sut.execute({
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
        await delivererRepository.create(deliverer);
        await recipientRepository.create(recipient);
        const response = await sut.execute({
            address: "new street",
            delivererId: deliverer.id.toString(),
            recipientId: recipient.id.toString(),
        });
        const deliverOnDb = await deliverRepository.findById(response.deliver.id)
        expect(deliverOnDb).toBeTruthy()
    })
});
