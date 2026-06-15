import { removeNonDigits } from "@/shared/remove-non-digits.js";

function calculateVerificationDigit(
    cpf: string,
    length: number,
): number {
    const sum = Array.from({ length }, (_, index) => {
        const digit = Number(cpf[index]);
        const weight = length + 1 - index;

        return digit * weight;
    }).reduce((total, value) => total + value, 0);

    const digit = (sum * 10) % 11;

    return digit === 10 ? 0 : digit;
}

export function isCpfValid(value: string): boolean {
    const cpf = removeNonDigits(value);

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    const firstDigit = calculateVerificationDigit(cpf, 9);

    if (firstDigit !== Number(cpf[9])) {
        return false;
    }

    const secondDigit = calculateVerificationDigit(cpf, 10);

    return secondDigit === Number(cpf[10]);
}