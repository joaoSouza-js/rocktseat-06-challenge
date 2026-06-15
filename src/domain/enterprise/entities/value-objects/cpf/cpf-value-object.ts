import { ValidationError } from "@/domain/error/validation-error.js";
import { removeNonDigits } from "@/shared/remove-non-digits.js";
import { isCpfValid } from "./cpf-validator.js";

export class CPFValueObject {


    private constructor(private readonly value: string) {
    }

    static create(cpf: string): CPFValueObject {

        const cpfIsValid = isCpfValid(cpf)

        if (cpfIsValid === false) throw new ValidationError("please provide a valid cpf")

        const cpfFormatted = removeNonDigits(cpf)

        return new CPFValueObject(cpfFormatted)

    }

    equals(other: CPFValueObject): boolean {
        return this.value === other.value;
    }

    get cpf(): string {
        return this.value
    }
}