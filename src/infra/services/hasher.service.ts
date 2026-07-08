import argon2 from "argon2";

import { HasherGenerator } from "@/domain/application/services/hasher-generator";
import { HasherVerify } from "@/domain/application/services/hasher-verify";

export class HasherService implements HasherGenerator, HasherVerify {
    generate(plaintext: string): Promise<string> {
        const hash = argon2.hash(plaintext);
        return hash
    }

    async verify(plaintext: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, plaintext);
    }
}