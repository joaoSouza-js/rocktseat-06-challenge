import { beforeEach, describe, expect, it } from "vitest";
import { AccountRepositoryInMemory } from "@/test/repositories/account-repository-in-memory.js";
import { DelivererRepositoryInMemory } from "@/test/repositories/deliverer-repository-in-memory.js";
import { FakeHasher } from "@/test/services/fake-hasher.js";
import type { AccountRepository } from "../../repositories/account-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import type { HasherGenerator } from "../../services/hasher-generator.js";
import { CreateDelivererUseCase, CreateDelivererUseCaseInput } from "./create-deliverer.js";
import { makeAccount } from "@/test/factory/make-account.js";

describe("create deliverer use case", () => {
    let accountRepository: AccountRepository;
    let hasherGenerator: HasherGenerator;
    let sut: CreateDelivererUseCase;
    let delivererRepository: DelivererRepository;
    beforeEach(() => {
        accountRepository = new AccountRepositoryInMemory();
        hasherGenerator = new FakeHasher();
        delivererRepository = new DelivererRepositoryInMemory();
        sut = new CreateDelivererUseCase({
            repositories: {
                accountRepository,
                delivererRepository,
            },
            services: {
                hasherGenerator,
            },
        });
    });

    it("should create and account and persist on database", async () => {
        const account = makeAccount()
        await accountRepository.create(account);
        const input: CreateDelivererUseCaseInput = {
            actorId: account.id.toString(),
            cpf: "529.982.247-25",
            password: "123456",
            name: "Pedro",
            phone: "+5511987654321",

        };

        const response = await sut.execute(input);

        const deliverOnList = await delivererRepository.findById(
            response.deliverer.id,
        );

        expect(deliverOnList).toBeTruthy();
    });
});
