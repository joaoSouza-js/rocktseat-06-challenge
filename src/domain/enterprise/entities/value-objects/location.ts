import { ValidationError } from "@/domain/error/validation-error.js";

interface AddressProps {
    address?: string;
    latitude: number;
    longitude: number;
}

export class LocationValueObject {
    private constructor(
        readonly props: AddressProps
    ) { }

    static create(input: AddressProps): LocationValueObject {
        const address = input.address?.trim();

        if (!!address && address.length < 5) {
            throw new ValidationError("Invalid address");
        }

        if (!Number.isFinite(input.latitude)) {
            throw new ValidationError("Latitude must be a finite number");
        }

        if (input.latitude < -90 || input.latitude > 90) {
            throw new ValidationError("Latitude must be between -90 and 90");
        }

        if (!Number.isFinite(input.longitude)) {
            throw new ValidationError("Longitude must be a finite number");
        }

        if (input.longitude < -180 || input.longitude > 180) {
            throw new ValidationError("Longitude must be between -180 and 180");
        }

        return new LocationValueObject({
            address,
            latitude: input.latitude,
            longitude: input.longitude,
        });
    }

    get address(): string | undefined {
        return this.props.address;
    }

    get latitude(): number {
        return this.props.latitude;
    }

    get longitude(): number {
        return this.props.longitude;
    }

    equals(other: LocationValueObject): boolean {
        return (
            this.props.address === other.props.address &&
            this.props.latitude === other.props.latitude &&
            this.props.longitude === other.props.longitude
        );
    }
}