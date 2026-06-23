import { ValidationError } from "@/domain/error/validation-error.js";

export enum RoleType {
    ADMIN = "ADMIN",
    DELIVERER = "DELIVERER",
}

export class RoleValueObject {
    private constructor(private readonly _value: RoleType) { }

    static create(value: string): RoleValueObject {
        if (!Object.values(RoleType).includes(value as RoleType)) {
            throw new ValidationError("Invalid role");
        }

        return new RoleValueObject(value as RoleType);
    }

    static admin(): RoleValueObject {
        return new RoleValueObject(RoleType.ADMIN);
    }

    static deliverer(): RoleValueObject {
        return new RoleValueObject(RoleType.DELIVERER);
    }

    get value(): RoleType {
        return this._value;
    }

    isAdmin(): boolean {
        return this._value === RoleType.ADMIN;
    }

    isDeliverer(): boolean {
        return this._value === RoleType.DELIVERER;
    }

    equals(role: RoleValueObject): boolean {
        return this._value === role._value;
    }
}