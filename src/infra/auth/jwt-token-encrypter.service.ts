import { AccessTokenEncrypter, AccessTokenEncrypterPayload } from "@/domain/application/services/cryptography/access-token-encrypter ";
import { RefreshTokenEncrypter, RefreshTokenEncrypterPayload } from "@/domain/application/services/cryptography/refresh-token-encrypter ";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiConfigService } from "../services/api-config.service";

@Injectable()
export class JwtTokenEncrypterService
    implements AccessTokenEncrypter, RefreshTokenEncrypter {
    constructor(
        private readonly jwt: JwtService,
        private readonly config: ApiConfigService,
    ) { }

    encryptToken(payload: AccessTokenEncrypterPayload) {
        return this.jwt.signAsync(
            {
                sub: payload.sub,
                permissions: payload.permissions,
            },
            {
                secret: this.config.jwtAccessSecret,
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
                secret: this.config.jwtAccessSecret,
                expiresIn: "30d",
            },
        );
    }
}