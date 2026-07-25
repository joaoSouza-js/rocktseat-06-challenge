import type { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { CPFValueObject } from "@/domain/enterprise/entities/account/value-objects/cpf/cpf-value-object.js";
import { CredentialsInvalid } from "@/domain/error/credentials-invalid.js";
import type { AccountRepository } from "../repositories/account-repository.js";
import type { HasherVerify } from "../services/hasher-verify.js";
import { AccessTokenEncrypter } from "../services/cryptography/access-token-encrypter .js";
import { RefreshTokenEncrypter } from "../services/cryptography/refresh-token-encrypter .js";

interface Repositories {
    accountRepository: AccountRepository;
}
interface Services {
    hasherVerify: HasherVerify;
    accessTokenEncrypter: AccessTokenEncrypter,
    refreshTokenEncrypter: RefreshTokenEncrypter
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
    token: string
    refresh_token: string
}
export class AuthenticationUseCase {
    private accountRepository: AccountRepository;
    private hasherVerify: HasherVerify;
    private accessTokenEncrypter: AccessTokenEncrypter
    private refreshTokenEncrypter: RefreshTokenEncrypter

    constructor(deps: AuthenticationAccountUseCaseDeps) {
        this.accountRepository = deps.repositories.accountRepository;
        this.hasherVerify = deps.services.hasherVerify;
        this.accessTokenEncrypter = deps.services.accessTokenEncrypter
        this.refreshTokenEncrypter = deps.services.refreshTokenEncrypter
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
        const token = await this.accessTokenEncrypter.encryptToken({
            sub: account.id.toString(),
            permissions: account.permissions
        })
        const refreshToken = await this.refreshTokenEncrypter.encryptRefreshToken({
            sub: account.id.toString(),
            permissions: account.permissions
        })

        return {
            account: account,
            token,
            refresh_token: refreshToken
        };
    }
}
