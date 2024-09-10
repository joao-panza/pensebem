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

        const req = args[0];
        const relevantArgs: any = {};
        if (req) {
            if (req.params && Object.keys(req.params).length > 0) {
                relevantArgs['params'] = req.params;
            }
            if (req.body && Object.keys(req.body).length > 0) {
                relevantArgs['body'] = req.body;
            }
            if (req.query && Object.keys(req.query).length > 0) {
                relevantArgs['query'] = req.query;
            }
        }

        if (res) {
            const originalJson = res.json;
            res.json = (body: any) => {
                result = body;
                const responseLog = result !== undefined ? JSON.stringify(result) : 'No direct return value';
                console.log(`Response ${responseLog}`);
                console.log("===============================================\n");
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

        const argsLog = JSON.stringify(relevantArgs);

        console.log(`[${className}] [${key}] ${time} - ${duration}ms\nRequest ${argsLog}`);

        return result;
    };

    return descriptor;
}
