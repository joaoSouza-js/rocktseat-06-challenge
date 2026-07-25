export interface RefreshTokenEncrypterPayload {
    sub: string,
    permissions: string[],
}


export interface RefreshTokenEncrypter {
    encryptRefreshToken(payload: RefreshTokenEncrypterPayload): Promise<string>;
}
