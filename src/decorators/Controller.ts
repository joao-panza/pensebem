import 'reflect-metadata';
import { LogMethod } from './LogMethod';

/**
 * @function Controller
 * @description Decorator que aplica o decorator LogMethod a todos os métodos da classe.
 * @returns {ClassDecorator} O decorator de classe.
 */
export function Controller(): ClassDecorator {
    return (target: any) => {
        const methods = Object.getOwnPropertyNames(target.prototype)
            .filter(prop => prop !== 'constructor' && typeof target.prototype[prop] === 'function');

        for (const method of methods) {
            const descriptor = Object.getOwnPropertyDescriptor(target.prototype, method);
            if (descriptor && !Reflect.hasMetadata('logMethodApplied', target.prototype, method)) {
                Object.defineProperty(target.prototype, method, LogMethod(target.prototype, method, descriptor));
                Reflect.defineMetadata('logMethodApplied', true, target.prototype, method);
            }
        }
    };
}
