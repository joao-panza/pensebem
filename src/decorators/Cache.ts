/**
 * @function Cache
 * @description Decorador para cachear o resultado de métodos. Utiliza os argumentos do método como chave de cache.
 * @param {Object} target - O protótipo do objeto.
 * @param {string} propertyKey - O nome do método.
 * @param {PropertyDescriptor} descriptor - O descritor de propriedade do método.
 * @returns {PropertyDescriptor} O descritor de propriedade modificado.
 */
export function Cache(target: Object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>();

    descriptor.value = function(...args: any[]): any {
        const cacheKey = JSON.stringify(args);
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        try {
            const result = originalMethod.apply(this, args);
            cache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.error(`Erro ao executar o método ${propertyKey}:`, error);
            throw error;
        }
    };

    return descriptor;
}
