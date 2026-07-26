import { ApiConfigService } from "@/infra/services/api-config.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    "jwt",
) {
    constructor(
        apiConfigService: ApiConfigService,
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
            sub: payload.sub,
            permissions: payload.permissions,
        };
    }
}