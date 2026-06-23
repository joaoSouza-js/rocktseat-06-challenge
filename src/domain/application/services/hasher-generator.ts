export interface HasherGenerator {
    generate(plaintext: string): string
}