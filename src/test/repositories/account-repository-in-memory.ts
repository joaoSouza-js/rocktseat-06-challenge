import type { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import type { AccountRepository } from "@/domain/application/repositories/account-repository.js";
import type { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import type { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";

export class AccountRepositoryInMemory implements AccountRepository {
    async update(account: Account): Promise<void> {
        const accountIndex = this.accounts.findIndex((account) => {
            return account.id.equals(account.id);
        });
        this.accounts[accountIndex] = account;

    }
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
