export interface HasherVerify {
    verify(plaintext: string, hash: string): Promise<boolean>
}