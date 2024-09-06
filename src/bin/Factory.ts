import 'reflect-metadata';

/**
 * @class Factory
 * @description Classe responsável pela criação e gerenciamento de instâncias singleton de outras classes.
 */
export default class Factory {
    private static instances = new Map<any, any>();

    /**
     * @method build
     * @description Cria uma instância singleton da classe especificada, injetando automaticamente as dependências.
     * @param {new (...args: any[]) => T} ClassName - O construtor da classe para a qual criar uma instância.
     * @returns {T} A instância singleton da classe especificada.
     */
    public static build<T>(ClassName: new (...args: any[]) => T): T {
        if (Factory.instances.has(ClassName)) {
            return Factory.instances.get(ClassName);
        }

        console.log(ClassName);
        const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', ClassName) || [];
        const dependencies = paramTypes.map((param) => Factory.build(param));

        const objectInstance = new ClassName(...dependencies);

        Factory.instances.set(ClassName, objectInstance);

        return objectInstance;
    }
}
