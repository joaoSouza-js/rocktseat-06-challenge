import { Account } from "@/domain/enterprise/entities/account/account-entity"

export class AccountPresenter {
    static toHttp(account: Account) {
        const presenterAccount = {
            id: account.id,
            name: account.name,
            cpf: account.cpf,
            permissions: account.permissions,
            phone: account.phone
        }

        return presenterAccount
    }
}