import type { Account } from "@/domain/enterprise/entities/account.js";
import { CPFValueObject } from "@/domain/enterprise/entities/value-objects/cpf/cpf-value-object.js";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherVerify } from "../services/hasher-verify.js";

interface Repositories {
    accountRepository: AccountRepository;
}
interface Services {
    hasherVerify: HasherVerify;
}
interface AuthenticationAccountUseCaseDeps {
    repositories: Repositories;
    services: Services;
}

export interface AuthenticationUseCaseInput {
    cpf: string;
    password: string;
}

export interface AuthenticationUseCaseResponse {
    account: Account;
}
export class AuthenticationUseCase {
    private accountRepository: AccountRepository;
    private hasherVerify: HasherVerify;

    constructor(deps: AuthenticationAccountUseCaseDeps) {
        this.accountRepository = deps.repositories.accountRepository;
        this.hasherVerify = deps.services.hasherVerify;
    }

    async execute(
        input: AuthenticationUseCaseInput,
    ): Promise<AuthenticationUseCaseResponse> {
        const cpf = CPFValueObject.create(input.cpf);
        const accountAlreadyExist = await this.accountRepository.findByCpf(cpf);

        if (accountAlreadyExist === null) {
            throw new CredentialsInvalid();
        }

        const verifyPassword = await this.hasherVerify.verify(
            input.password,
            accountAlreadyExist.passwordHashed,
        );

        if (verifyPassword === false) {
            throw new CredentialsInvalid();
        }

        const account = accountAlreadyExist;

        return {
            account: account,
        };
    }


}
