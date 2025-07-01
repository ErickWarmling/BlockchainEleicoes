import * as crypto from "crypto";

export function hashCPF(cpf: string): string {
    return crypto.createHash('sha256').update(cpf).digest('hex');
}