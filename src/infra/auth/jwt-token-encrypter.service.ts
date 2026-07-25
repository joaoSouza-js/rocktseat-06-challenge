import { AccessTokenEncrypter, AccessTokenEncrypterPayload } from "@/domain/application/services/cryptography/access-token-encrypter ";
import { RefreshTokenEncrypter, RefreshTokenEncrypterPayload } from "@/domain/application/services/cryptography/refresh-token-encrypter ";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenEncrypterService
    implements AccessTokenEncrypter, RefreshTokenEncrypter {
    constructor(
        private readonly jwt: JwtService,
    ) { }

    encryptToken(payload: AccessTokenEncrypterPayload) {
        return this.jwt.signAsync(
            {
                sub: payload.sub,
                permissions: payload.permissions,
            },
            {
                expiresIn: "7d",
            },
        );
    }

    encryptRefreshToken(payload: RefreshTokenEncrypterPayload) {
        return this.jwt.signAsync(
            {
                sub: payload.sub,
                permissions: payload.permissions,
            },
            {
                expiresIn: "30d",
            },
        );
    }
}