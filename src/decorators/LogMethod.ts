/**
 * @function LogMethod
 * @description Decorator que adiciona logging para métodos de classe, registrando o tempo de execução e a resposta.
 * @param {any} target - O protótipo da classe.
 * @param {string} key - O nome do método.
 * @param {PropertyDescriptor} descriptor - O descritor de propriedade do método.
 * @returns {PropertyDescriptor} O descritor de propriedade modificado.
 */
export function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
        const startTime = Date.now();
        let result;
        const res = args.find((arg: any) => arg && typeof arg === 'object' && 'status' in arg && 'json' in arg);

        if (res) {
            const originalJson = res.json;
            res.json = (body: any) => {
                result = body;
                return originalJson.call(res, body);
            };
        }

        try {
            await originalMethod.apply(this, args);
        } catch (error: any) {
            result = { error: error.message };
        }

        const duration = Date.now() - startTime;
        const time = new Date().toLocaleTimeString();
        const className = this.constructor.name;

        const responseLog = result !== undefined ? JSON.stringify(result, null, 2) : 'No direct return value';

        console.log(`[${className}] [${key}] ${time} - ${duration}ms - Response ${responseLog}`);

        return result;
    };

    return descriptor;
}
