import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";
import type { Account } from "@/domain/enterprise/entities/account-entity.js";

export interface AccountRepository {
    create(account: Account): Promise<void>;
    findById(id: UniqueEntityId): Promise<Account | null>;
    findByCpf(cpf: CPFValueObject): Promise<Account | null>;
}
