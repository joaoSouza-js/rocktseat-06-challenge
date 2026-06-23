import type { UniqueEntityId } from "@/core/unique-entity-id.js";
import type { AccountRepository } from "@/domain/application/repositories/account-repository.js";
import type { Account } from "@/domain/enterprise/entities/account.js";
import type { CPFValueObject } from "@/domain/enterprise/entities/value-objects/cpf/cpf-value-object.js";

export class AccountRepositoryInMemory implements AccountRepository {
    findByCpf(cpf: CPFValueObject): Promise<Account | null> {
        const accountFounded =
            this.accounts.find((account) => {
                return account.cpf.equals(cpf);
            }) ?? null;
        return Promise.resolve(accountFounded);
    }
    private accounts: Account[] = [];

    create(input: Account): Promise<void> {
        this.accounts.push(input);
        return Promise.resolve();
    }

    findById(id: UniqueEntityId): Promise<Account | null> {
        const accountFounded =
            this.accounts.find((account) => {
                return account.id.equals(id);
            }) ?? null;
        return Promise.resolve(accountFounded);
    }
}
