import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ApiConfigService } from "../services/api-config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    "jwt",
) {
    constructor(
        private readonly apiConfigService: ApiConfigService,
    ) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),

            ignoreExpiration: false,

            secretOrKey:
                apiConfigService.jwtAccessSecret,
        });
    }

    validate(payload: {
        sub: string;
        permissions: string[];
    }) {
        return {
            accountId: payload.sub,
            permissions: payload.permissions,
        };
    }
}