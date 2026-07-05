import { ResourceNotFound } from "@/domain/error/resouce-not-found.js";

export function ensureExists<T>(
    value: T | null | undefined,
    resource: string,
    data?: string
): asserts value is T {
    if (value == null) {
        throw new ResourceNotFound(resource, data)
    }

}