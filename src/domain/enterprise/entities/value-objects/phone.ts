export class PhoneValueObject {
    private constructor(
        private readonly phone: string,
    ) { }

    static create(phone: string): PhoneValueObject {
        const normalized = phone.replace(/\s|-/g, "");

        if (!/^\+\d{10,15}$/.test(normalized)) {
            throw new Error("Invalid phone");
        }

        return new PhoneValueObject(normalized);
    }

    static rehydrate(phone: string): PhoneValueObject {
        return new PhoneValueObject(phone);
    }

    get value(): string {
        return this.phone;
    }

    equals(other: PhoneValueObject): boolean {
        return this.phone === other.phone;
    }
}