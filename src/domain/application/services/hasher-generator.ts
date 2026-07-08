export interface HasherGenerator {
    generate(plaintext: string): Promise<string>;
}