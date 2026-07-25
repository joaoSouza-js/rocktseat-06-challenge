export interface AccessTokenEncrypterPayload {
    sub: string,
    permissions: string[],
}

export interface AccessTokenEncrypter {
    encryptToken(payload: AccessTokenEncrypterPayload): Promise<string>;
}
