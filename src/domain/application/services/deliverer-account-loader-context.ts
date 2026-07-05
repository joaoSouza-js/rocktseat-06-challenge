import { ensureExists } from "@/domain/core/guards/ensure-exist.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { AccountRepository } from "../repositories/account-repository.js";
import { DelivererRepository } from "../repositories/deliverer-repository.js";
import { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";

interface fromDelivererIdResponse {
    account: Account
    deliverer: Deliverer
}

export class DelivererAccountLoaderContext {
    constructor(
        private delivererRepository: DelivererRepository,
        private accountRepository: AccountRepository,
    ) { }

    async load(delivererId: UniqueEntityId): Promise<fromDelivererIdResponse> {
        const deliverer = await this.delivererRepository.findById(delivererId);
        ensureExists(deliverer, "Deliverer");

        const account = await this.accountRepository.findById(deliverer.accountId);
        ensureExists(account, "Account");

        return {
            account: account,
            deliverer: deliverer
        }
    }
}