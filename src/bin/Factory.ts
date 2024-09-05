import 'reflect-metadata';

export default class Factory {
    private static instances = new Map<any, any>();

    public static build<T>(ClassName: new (...args: any[]) => T): T {
        if (Factory.instances.has(ClassName)) {
            return Factory.instances.get(ClassName);
        }

        console.log(ClassName)
        const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', ClassName) || [];
        const dependencies = paramTypes.map((param) => Factory.build(param));

        const objectInstance = new ClassName(...dependencies);

        Factory.instances.set(ClassName, objectInstance);

        return objectInstance;
    }
}
