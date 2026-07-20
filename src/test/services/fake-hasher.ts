import { randomUUID } from "node:crypto";
import type { HasherGenerator } from "@/domain/application/services/hasher-generator.js";
import type { HasherVerify } from "@/domain/application/services/hasher-verify.js";

export class FakeHasher implements HasherGenerator, HasherVerify {
    private hash = randomUUID();



    static readonly instance = new FakeHasher();


    async generate(plaintext: string): Promise<string> {
        const passwordHashed = plaintext.concat(this.hash)
        return passwordHashed
    }
    verify(plaintext: string, hash: string): Promise<boolean> {


        const passwordHashed = plaintext.concat(this.hash)

        const isValidPassword = hash === passwordHashed
        return Promise.resolve(isValidPassword)
    }
}
