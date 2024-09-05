export function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>();

    descriptor.value = function(...args: any[]) {
        const cacheKey = JSON.stringify(args);
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        const result = originalMethod.apply(this, args);
        cache.set(cacheKey, result);
        return result;
    };

    return descriptor;
}
